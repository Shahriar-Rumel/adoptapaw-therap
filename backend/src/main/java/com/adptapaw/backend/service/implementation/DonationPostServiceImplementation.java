package com.adptapaw.backend.service.implementation;



import com.adptapaw.backend.entity.Donation;
import com.adptapaw.backend.entity.DonationPost;

import com.adptapaw.backend.payload.donations.DonationPostDTO;
import com.adptapaw.backend.payload.donations.DonationPostResponseDTO;
import com.adptapaw.backend.repository.DonationRepository;
import com.adptapaw.backend.repository.DonationPostRepository;
import com.adptapaw.backend.service.DonationPostService;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class DonationPostServiceImplementation implements DonationPostService {
    private ModelMapper mapper;


    private DonationPostRepository donationPostRepository;
    private DonationRepository donationRepository;


//    @Autowired
//    private UserRepository userRepository;


    public DonationPostServiceImplementation(ModelMapper mapper, DonationPostRepository donationPostRepository, DonationRepository donationGiverRepository) {
        this.mapper = mapper;
        this.donationPostRepository = donationPostRepository;
        this.donationRepository = donationGiverRepository;
    }


    private DonationPostDTO mapToDTO(DonationPost donationPost){
        DonationPostDTO donationPostDTO = mapper.map(donationPost, DonationPostDTO.class);
        return donationPostDTO;
    }

    // convert DTO to entity
    private DonationPost mapToEntity(DonationPostDTO donationPostDTO){
        DonationPost donationPost = mapper.map(donationPostDTO, DonationPost.class);
        return donationPost;
    }

    //    @Override
//    public AdoptionAnimalDTO getByCreator(Long creator) {
//        AdoptionAnimal adoptionAnimal = (AdoptionAnimal) AdoptionAnimalRepository.findByCreator(String.valueOf(creator));
////                .orElseThrow(() -> new ResourceNotFoundException("Adoption Animal", "id", creator));
//        return mapToDTO(adoptionAnimal);
//    }
//


    @Override
    public DonationPostResponseDTO getAllDonationsPosts(int pageNo, int pageSize, String sortBy, String sortDir) {

        Sort sort = sortDir.equalsIgnoreCase(Sort.Direction.ASC.name()) ? Sort.by(sortBy).ascending()
                : Sort.by(sortBy).descending();

        Pageable pageable = PageRequest.of(pageNo, pageSize, sort);
        Page<DonationPost> newpost = donationPostRepository.findAll(pageable);
        List<DonationPost> donationPost = newpost.getContent();

        List<DonationPostDTO> content= donationPost.stream().map(donationPostItem -> mapToDTO(donationPostItem)).collect(Collectors.toList());


        DonationPostResponseDTO donationPostResponse = new DonationPostResponseDTO();
        donationPostResponse.setContent(content);
        donationPostResponse.setPageNo(newpost.getNumber());
        donationPostResponse.setPageSize(newpost.getSize());
        donationPostResponse.setTotalElements(newpost.getTotalElements());
        donationPostResponse.setTotalPages(newpost.getTotalPages());
        donationPostResponse.setLast(newpost.isLast());

        return donationPostResponse;
    }

    @Override
    public DonationPostDTO createDonationsPost(DonationPostDTO donationPostDTO) {


        DonationPost feeds = new DonationPost();
        feeds.setName(donationPostDTO.getName());
        feeds.setType(donationPostDTO.getType());
        feeds.setDescription(donationPostDTO.getDescription());
        feeds.setTargetamount(donationPostDTO.getTargetamount());
        feeds.setRemainingamount(donationPostDTO.getTargetamount());
        feeds.setPeopledonated(0L);
        feeds.setImage(donationPostDTO.getImage());
        feeds.setLocation(donationPostDTO.getLocation());
        Date date = new Date();
        feeds.setCreationtime(String.valueOf(date));


        donationPostRepository.save(feeds);
        donationPostDTO.setId(feeds.getId());


        return donationPostDTO;

    }

    @Override
    public DonationPostDTO getAllById(String id) {

        DonationPost donationPost =donationPostRepository.findById(Long.valueOf(id)).get();

        return mapToDTO(donationPost);
    }

    @Override
    public DonationPostDTO updateById(String id, DonationPostDTO donationPostDTO) {

        DonationPost feeds = donationPostRepository.findById(Long.valueOf(id)).get();

        feeds.setName(donationPostDTO.getName());
        feeds.setType(donationPostDTO.getType());
        feeds.setDescription(donationPostDTO.getDescription());
        feeds.setTargetamount(donationPostDTO.getTargetamount());
        feeds.setImage(donationPostDTO.getImage());
        feeds.setLocation(donationPostDTO.getLocation());
        donationPostRepository.save(feeds);

        return mapToDTO(feeds);

    }

    @Override
    public String DeleteById(String id) {
        DonationPost post = donationPostRepository.findById(Long.valueOf(id)).get();
        List<Donation>donationGiverList = donationRepository.findAllByDonationpost(post);

        for (Donation donationGiver :donationGiverList) {
            donationGiver.setDonator(null);
            donationGiver.setDonationpost(null);
            donationRepository.deleteById(donationGiver.getId());
        }


        donationPostRepository.delete(post);
        return "Post Deleted Successfully " + post.getId();
    }

}
