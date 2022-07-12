package com.adptapaw.backend.service.implementation;

import com.adptapaw.backend.entity.AdoptionAnimal;
import com.adptapaw.backend.entity.AdoptionRequest;
import com.adptapaw.backend.entity.User;
import com.adptapaw.backend.payload.adoption.*;
import com.adptapaw.backend.repository.AdoptionAnimalRepository;
import com.adptapaw.backend.repository.AdoptionRequestRepository;
import com.adptapaw.backend.repository.UserRepository;
import com.adptapaw.backend.service.AdoptionRequestService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
public class AdoptionRequestServiceImplementation implements AdoptionRequestService {
    private final ModelMapper mapper;
    private final AdoptionRequestRepository adoptionRequestRepository;

    private final AdoptionAnimalRepository adoptionAnimalRepository;
    @Autowired
    private UserRepository userRepository;

    public AdoptionRequestServiceImplementation(ModelMapper mapper, AdoptionRequestRepository adoptionRequestRepository,AdoptionAnimalRepository adoptionAnimalRepository) {
        this.mapper = mapper;
        this.adoptionRequestRepository = adoptionRequestRepository;
        this.adoptionAnimalRepository = adoptionAnimalRepository;
    }

    private AdoptionAnimalDTO mapToDTO(AdoptionAnimal adoptionAnimal){
        return mapper.map(adoptionAnimal, AdoptionAnimalDTO.class);
    }

    private AdoptionRequestDTO mapToRequestDTO(AdoptionRequest adoptionRequest){
        return mapper.map(adoptionRequest, AdoptionRequestDTO.class);
    }

    private AdoptionUserDTO mapTouserDTO(User user){
        return mapper.map(user, AdoptionUserDTO.class);
    }

    public AdoptionRequestDTO createAdoptionRequest(String uid,String id, AdoptionRequestDTO adoptionRequestDTO) {

        AdoptionRequest request = new AdoptionRequest();
        request.setStatus(false);
        Date date = new Date();
        request.setRequestdate(String.valueOf(date));
        request.setApproveddate(String.valueOf(date));
        request.setEmail(adoptionRequestDTO.getEmail());
        request.setRfa(adoptionRequestDTO.getRfa());
        request.setMobile(adoptionRequestDTO.getMobile());
        request.setPickup(adoptionRequestDTO.getPickup());
        request.setHadpet(adoptionRequestDTO.getHadpet());

        User user = (User)this.userRepository.findById(Long.valueOf(uid)).orElse(null);
        request.setAdoptionseeker(user);

        AdoptionAnimal pet = (AdoptionAnimal)this.adoptionAnimalRepository.findById(Long.valueOf(id)).orElse(null);
        request.setPet(pet);

        assert user != null;
        assert pet != null;
        if(Objects.equals(pet.getUser().getEmail(), user.getEmail())){
            System.out.println("Can't Adopt");
            return null;
        }
        this.adoptionRequestRepository.save(request);

        AdoptionAnimalDTO adoptionAnimalDTO = mapToDTO(pet);

        AdoptionUserDTO adoptionUserDTO = mapTouserDTO(user);

        return mapToRequestDTO(request);
    }


    public AdoptionRequestListDTO getAllByCreator(String id) {

        User user  = userRepository.findById(Long.valueOf(id)).get();
        List<AdoptionRequest> adoptionRequests = adoptionRequestRepository.findAllByAdoptionseeker(user);

        List<AdoptionRequestDTO> content= adoptionRequests.stream().map(this::mapToRequestDTO).collect(Collectors.toList());
        AdoptionRequestListDTO adoptionRequestListDTO = new AdoptionRequestListDTO();
        adoptionRequestListDTO.setContent(content);
        return adoptionRequestListDTO;
    }

    @Override
    public AdoptionRequestDTO getById(String uid,String id) {
        AdoptionRequest adoptionRequest = adoptionRequestRepository.findById(Long.valueOf(id)).get();
        User user  = userRepository.findById(Long.valueOf(uid)).get();

        if(adoptionRequest.getAdoptionseeker() != user){
            return null;
        }
        return mapToRequestDTO(adoptionRequest);
    }
}

