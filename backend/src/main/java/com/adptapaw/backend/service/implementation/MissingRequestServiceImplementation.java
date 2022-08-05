package com.adptapaw.backend.service.implementation;



import com.adptapaw.backend.entity.*;

import com.adptapaw.backend.payload.missing.MissingAnimalDTO;
import com.adptapaw.backend.payload.missing.MissingRequestDTO;
import com.adptapaw.backend.payload.missing.MissingRequestListDTO;
import com.adptapaw.backend.repository.MissingAnimalRepository;
import com.adptapaw.backend.repository.MissingRequestRepository;
import com.adptapaw.backend.repository.UserRepository;
import com.adptapaw.backend.service.MissingRequestService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
public class MissingRequestServiceImplementation implements MissingRequestService {
    private final ModelMapper mapper;
    private final MissingRequestRepository missingRequestRepository;

    private final MissingAnimalRepository missingAnimalRepository;
    @Autowired
    private UserRepository userRepository;
    private String currentRole ;


    public MissingRequestServiceImplementation(ModelMapper mapper, MissingRequestRepository missingRequestRepository,MissingAnimalRepository missingAnimalRepository) {
        this.mapper = mapper;
        this.missingRequestRepository = missingRequestRepository;
        this.missingAnimalRepository = missingAnimalRepository;
    }

    private MissingAnimalDTO mapToDTO(MissingAnimal missingAnimal){
        return mapper.map(missingAnimal, MissingAnimalDTO.class);
    }

    private MissingRequestDTO mapToRequestDTO(MissingRequest missingRequest){
        return mapper.map(missingRequest, MissingRequestDTO.class);
    }



    public MissingRequestDTO createMissingRequest(String id, MissingRequestDTO missingRequestDTO) {

        MissingRequest request = new MissingRequest();
        request.setStatus(false);
        Date date = new Date();
        request.setRequestdate(String.valueOf(date));
        request.setApproveddate(String.valueOf(date));
        request.setEmail(missingRequestDTO.getEmail());
        request.setMobile(missingRequestDTO.getMobile());
        request.setLocation(missingRequestDTO.getLocation());
        request.setImage(missingRequestDTO.getImage());


        MissingAnimal pet = (MissingAnimal)this.missingAnimalRepository.findById(Long.valueOf(id)).orElse(null);
        request.setPet(pet);



        this.missingRequestRepository.save(request);

        MissingAnimalDTO missingAnimalDTO = mapToDTO(pet);



        return mapToRequestDTO(request);
    }




    @Override
    public MissingRequestDTO getById(String id) {
        MissingRequest missingRequest = missingRequestRepository.findById(Long.valueOf(id)).get();

        return mapToRequestDTO(missingRequest);
    }

    @Override
    public MissingRequestListDTO getAll(String id, int pageNo, int pageSize, String sortBy, String sortDir) {

        Sort sort = sortDir.equalsIgnoreCase(Sort.Direction.ASC.name()) ? Sort.by(sortBy).ascending()
                : Sort.by(sortBy).descending();

        Pageable pageable = PageRequest.of(pageNo, pageSize, sort);

        Page<MissingRequest> requests = missingRequestRepository.findAll(pageable);

        List<MissingRequest> missingRequests = requests.getContent();

        List<MissingRequestDTO> content= missingRequests.stream().map(adoptionRequestsItem -> mapToRequestDTO(adoptionRequestsItem)).collect(Collectors.toList());


        MissingRequestListDTO missingRequestListDTO = new MissingRequestListDTO();
        missingRequestListDTO.setContent(content);
        missingRequestListDTO.setPageNo(requests.getNumber());
        missingRequestListDTO.setPageSize(requests.getSize());
        missingRequestListDTO.setTotalElements(requests.getTotalElements());
        missingRequestListDTO.setTotalPages(requests.getTotalPages());
        missingRequestListDTO.setLast(requests.isLast());

        return missingRequestListDTO;
    }
    @Override
    public MissingRequestDTO approveInfo(String uid, String id) {

        MissingRequest missingRequest = missingRequestRepository.findById(Long.valueOf(id)).get();
        MissingAnimal animal  = missingAnimalRepository.findById(missingRequest.getPet().getId()).get();

        try{
            User user = userRepository.findById(Long.valueOf(uid)).get();


            for (Roles authority : user.getRoles()) {
                currentRole = authority.getName();
            }

            if(currentRole.equals("ROLE_ADMIN")){

                Date date = new Date();
                missingRequest.setStatus(true);
                missingRequest.setApproveddate(String.valueOf(date));
                missingRequestRepository.save(missingRequest);

                animal.setStillmissing(false);
                missingAnimalRepository.save(animal);

                return mapToRequestDTO(missingRequest);
            }
        }catch (UsernameNotFoundException e){
            return null;
        }

        return null;

    }
}
