package com.adptapaw.backend.service.implementation;



import com.adptapaw.backend.entity.DonationGiver;
import com.adptapaw.backend.entity.Donations;

import com.adptapaw.backend.payload.donations.DonationsDTO;
import com.adptapaw.backend.payload.donations.DonationsResponseDTO;
import com.adptapaw.backend.repository.DonationGiverRepository;
import com.adptapaw.backend.repository.DonationsRepository;
import com.adptapaw.backend.service.DonationsService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class DonationsServiceImplementation implements DonationsService {
    private ModelMapper mapper;


    private DonationsRepository donationsRepository;
    private DonationGiverRepository donationGiverRepository;


//    @Autowired
//    private UserRepository userRepository;


    public DonationsServiceImplementation(ModelMapper mapper, DonationsRepository donationsRepository, DonationGiverRepository donationGiverRepository) {
        this.mapper = mapper;
        this.donationsRepository = donationsRepository;
        this.donationGiverRepository = donationGiverRepository;
    }


    private DonationsDTO mapToDTO(Donations donations){
        DonationsDTO donationsDTO = mapper.map(donations, DonationsDTO.class);
        return donationsDTO;
    }

    // convert DTO to entity
    private Donations mapToEntity(DonationsDTO donationsDTO){
        Donations donations = mapper.map(donationsDTO, Donations.class);
        return donations;
    }

    //    @Override
//    public AdoptionAnimalDTO getByCreator(Long creator) {
//        AdoptionAnimal adoptionAnimal = (AdoptionAnimal) AdoptionAnimalRepository.findByCreator(String.valueOf(creator));
////                .orElseThrow(() -> new ResourceNotFoundException("Adoption Animal", "id", creator));
//        return mapToDTO(adoptionAnimal);
//    }
//


    @Override
    public DonationsResponseDTO getAllDonationsPosts() {
        List<Donations> donations = donationsRepository.findAll();

        List<DonationsDTO> content= donations.stream().map(donationsItem -> mapToDTO(donationsItem)).collect(Collectors.toList());


        DonationsResponseDTO donationsResponse = new DonationsResponseDTO();
        donationsResponse.setContent(content);

        return donationsResponse;
    }

    @Override
    public DonationsDTO createDonationsPost(DonationsDTO donationsDTO) {


        Donations feeds = new Donations();
        feeds.setName(donationsDTO.getName());
        feeds.setType(donationsDTO.getType());
        feeds.setDescription(donationsDTO.getDescription());
        feeds.setTargetamount(donationsDTO.getTargetamount());
        feeds.setRemainingamount(donationsDTO.getTargetamount());
        feeds.setPeopledonated(0L);
        feeds.setImage(donationsDTO.getImage());

        donationsRepository.save(feeds);
        donationsDTO.setId(feeds.getId());


        return donationsDTO;

    }

    @Override
    public DonationsDTO getAllById(String id) {

        Donations donations = donationsRepository.findById(Long.valueOf(id)).get();

        return mapToDTO(donations);
    }

    @Override
    public DonationsDTO updateById(String id, DonationsDTO donationsDTO) {

        Donations feeds =donationsRepository.findById(Long.valueOf(id)).get();

        feeds.setName(donationsDTO.getName());
        feeds.setType(donationsDTO.getType());
        feeds.setDescription(donationsDTO.getDescription());
        feeds.setTargetamount(donationsDTO.getTargetamount());
        feeds.setImage(donationsDTO.getImage());

        donationsRepository.save(feeds);

        return mapToDTO(feeds);

    }

    @Override
    public String DeleteById(String id) {
        Donations post = donationsRepository.findById(Long.valueOf(id)).get();
        List<DonationGiver>donationGiverList = donationGiverRepository.findAllByDonationpost(post);

        for (DonationGiver donationGiver :donationGiverList) {
            donationGiver.setDonationgiver(null);
            donationGiver.setDonationpost(null);
            donationGiverRepository.deleteById(donationGiver.getId());
        }


        donationsRepository.delete(post);
        return "Post Deleted Successfully " + post.getId();
    }

}
