package com.adptapaw.backend.service.implementation;


import com.adptapaw.backend.entity.MissingAnimal;
import com.adptapaw.backend.entity.User;
import com.adptapaw.backend.payload.missing.MissingAnimalDTO;
import com.adptapaw.backend.payload.missing.MissingAnimalResponseDTO;
import com.adptapaw.backend.payload.missing.MissingUserDTO;
import com.adptapaw.backend.repository.MissingAnimalRepository;
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


    @Autowired
    private UserRepository userRepository;


    public MissingAnimalServiceImplementation(ModelMapper mapper, MissingAnimalRepository missingAnimalRepository) {
        this.mapper = mapper;
        this.missingAnimalRepository = missingAnimalRepository;
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

    //    @Override
//    public AdoptionAnimalDTO getByCreator(Long creator) {
//        AdoptionAnimal adoptionAnimal = (AdoptionAnimal) AdoptionAnimalRepository.findByCreator(String.valueOf(creator));
////                .orElseThrow(() -> new ResourceNotFoundException("Adoption Animal", "id", creator));
//        return mapToDTO(adoptionAnimal);
//    }
//
    @Override
    public MissingAnimalResponseDTO getAllByCreator(String id) {

        User user  = userRepository.findById(Long.valueOf(id)).get();
        List<MissingAnimal> missingAnimal = missingAnimalRepository.findAllByUser(user);

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

        User user = userRepository.findById(Long.valueOf(id)).orElse(null);
        animal.setUser(user);

        missingAnimalRepository.save(animal);

        MissingUserDTO missingUserDTO = new MissingUserDTO();

        missingUserDTO.setUsername(user.getUsername());
        missingUserDTO.setId(user.getId());

        missingAnimalDTO.setUser(missingUserDTO);


        missingAnimalDTO.setId(animal.getId());

//        AdoptionAnimalResponseDTO response = new AdoptionAnimalResponseDTO();


        return missingAnimalDTO;



//        AdoptionAnimal adoptionAnimalPost = mapToEntity(adoptionAnimalPostDTO);
//        AdoptionAnimal newAdoptionAnimalPost = adoptionAnimalRepository.save(adoptionAnimalPost);
//
//        // convert entity to DTO
//        AdoptionAnimalDTO adoptionPostResponse = mapToDTO(newAdoptionAnimalPost);
//        return adoptionPostResponse;
    }

    @Override
    public MissingAnimalDTO getAllById(String id) {

        MissingAnimal missingAnimal = missingAnimalRepository.findById(Long.valueOf(id)).get();

        return mapToDTO(missingAnimal);
    }

}
