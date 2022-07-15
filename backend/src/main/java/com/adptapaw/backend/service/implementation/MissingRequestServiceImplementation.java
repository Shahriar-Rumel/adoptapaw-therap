package com.adptapaw.backend.service.implementation;


import com.adptapaw.backend.entity.MissingAnimal;
import com.adptapaw.backend.entity.MissingRequest;
import com.adptapaw.backend.payload.missing.MissingAnimalDTO;
import com.adptapaw.backend.payload.missing.MissingRequestDTO;
import com.adptapaw.backend.repository.MissingAnimalRepository;
import com.adptapaw.backend.repository.MissingRequestRepository;
import com.adptapaw.backend.service.MissingRequestService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
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
}
