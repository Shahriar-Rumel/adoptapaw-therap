package com.adptapaw.backend.service.implementation;



import com.adptapaw.backend.entity.MissingAnimal;
import com.adptapaw.backend.entity.MissingRequest;
import com.adptapaw.backend.entity.User;

import com.adptapaw.backend.payload.missing.MissingAnimalDTO;
import com.adptapaw.backend.payload.missing.MissingAnimalResponseDTO;
import com.adptapaw.backend.payload.missing.MissingUserDTO;
import com.adptapaw.backend.repository.MissingAnimalRepository;
import com.adptapaw.backend.repository.MissingRequestRepository;
import com.adptapaw.backend.repository.UserRepository;
import com.adptapaw.backend.service.MissingAnimalService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class MissingAnimalServiceImplementation implements MissingAnimalService {

    private ModelMapper mapper;

    private MissingAnimalRepository missingAnimalRepository;

    private MissingRequestRepository missingRequestRepository;


    @Autowired
    private UserRepository userRepository;


    public MissingAnimalServiceImplementation(ModelMapper mapper, MissingAnimalRepository missingAnimalRepository, MissingRequestRepository missingRequestRepository) {
        this.mapper = mapper;
        this.missingAnimalRepository = missingAnimalRepository;
        this.missingRequestRepository = missingRequestRepository;
    }

    private MissingAnimalDTO mapToDTO(MissingAnimal missingAnimal){
        MissingAnimalDTO missingAnimalDTO = mapper.map(missingAnimal, MissingAnimalDTO.class);
        return missingAnimalDTO;
    }

    // convert DTO to entity
    private MissingAnimal mapToEntity(MissingAnimalDTO missingAnimalDTO){
        MissingAnimal missingAnimal = mapper.map(missingAnimalDTO, MissingAnimal.class);
        return missingAnimal;
    }


    @Override
    public MissingAnimalResponseDTO getAllByCreator(String id) {

        User user  = userRepository.findById(Long.valueOf(id)).get();
        List<MissingAnimal> missingAnimal = missingAnimalRepository.findAllByCreator(user);

        List<MissingAnimalDTO> content = missingAnimal.stream().map(missingAnimalItem -> mapToDTO(missingAnimalItem)).collect(Collectors.toList());
        MissingAnimalResponseDTO missingAnimalResponse = new MissingAnimalResponseDTO();
        missingAnimalResponse.setContentfile(content);
        return missingAnimalResponse;
    }


    @Override
    public MissingAnimalResponseDTO getAllMissingAnimals() {
        List<MissingAnimal> missingAnimal = missingAnimalRepository.findAll();

        List<MissingAnimalDTO> content= missingAnimal.stream().map(missingAnimalItem -> mapToDTO(missingAnimalItem)).collect(Collectors.toList());

        MissingAnimalResponseDTO missingAnimalResponse = new MissingAnimalResponseDTO();
        missingAnimalResponse.setContentfile(content);

        return missingAnimalResponse;
    }

    @Override
    public MissingAnimalDTO createMissingAnimal(String id, MissingAnimalDTO missingAnimalDTO) {


        MissingAnimal animal = new MissingAnimal();
        animal.setBreed(missingAnimalDTO.getBreed());
        animal.setColor(missingAnimalDTO.getColor());
        animal.setDatemissing(missingAnimalDTO.getDatemissing());
        animal.setGender(missingAnimalDTO.getGender());
        animal.setType(missingAnimalDTO.getType());
        animal.setLocation(missingAnimalDTO.getLocation());
        animal.setName(missingAnimalDTO.getName());
        animal.setVaccine(missingAnimalDTO.getVaccine());
        animal.setStillmissing(true);
        animal.setSpecificattribute(missingAnimalDTO.getSpecificattribute());
        animal.setAccessorieslastworn(missingAnimalDTO.getAccessorieslastworn());
        animal.setRewards(missingAnimalDTO.getRewards());
        animal.setImage(missingAnimalDTO.getImage());

        User user = userRepository.findById(Long.valueOf(id)).orElse(null);
        animal.setCreator(user);

        missingAnimalRepository.save(animal);

        MissingUserDTO missingUserDTO = new MissingUserDTO();

        assert user != null;
        missingUserDTO.setUsername(user.getUsername());
        missingUserDTO.setId(user.getId());
        missingAnimalDTO.setCreator(missingUserDTO);
        missingAnimalDTO.setId(animal.getId());


        return missingAnimalDTO;

    }

    @Override
    public MissingAnimalDTO getAllById(String id) {

        MissingAnimal missingAnimal = missingAnimalRepository.findById(Long.valueOf(id)).get();

        return mapToDTO(missingAnimal);
    }
    @Override
    public MissingAnimalDTO updateById(String id, MissingAnimalDTO missingAnimalDTO) {
        MissingAnimal missingAnimal = missingAnimalRepository.findById(Long.valueOf(id)).get();


        missingAnimal.setBreed(missingAnimalDTO.getBreed());
        missingAnimal.setColor(missingAnimalDTO.getColor());
        missingAnimal.setDatemissing(missingAnimalDTO.getDatemissing());
        missingAnimal.setGender(missingAnimalDTO.getGender());
        missingAnimal.setType(missingAnimalDTO.getType());
        missingAnimal.setLocation(missingAnimalDTO.getLocation());
        missingAnimal.setName(missingAnimalDTO.getName());
        missingAnimal.setVaccine(missingAnimalDTO.getVaccine());
        missingAnimal.setStillmissing(true);
        missingAnimal.setSpecificattribute(missingAnimalDTO.getSpecificattribute());
        missingAnimal.setAccessorieslastworn(missingAnimalDTO.getAccessorieslastworn());
        missingAnimal.setRewards(missingAnimalDTO.getRewards());
        missingAnimal.setImage(missingAnimalDTO.getImage());


        missingAnimalRepository.save( missingAnimal);

        return mapToDTO(missingAnimal);

    }

    @Override
    public String DeleteById(String id) {
        MissingAnimal animal = missingAnimalRepository.findById(Long.valueOf(id)).get();
        List<MissingRequest>animalRequestList = missingRequestRepository.findAllByPet(animal);

        for (MissingRequest missingRequest : animalRequestList) {
            missingRequest.setPet(null);
            missingRequestRepository.deleteById(missingRequest.getId());
        }

        animal.setCreator(null);
        missingAnimalRepository.delete(animal);
        return "Post Deleted Successfully " + animal.getId();
    }

}
