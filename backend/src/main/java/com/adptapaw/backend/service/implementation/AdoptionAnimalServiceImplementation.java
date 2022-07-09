package com.adptapaw.backend.service.implementation;

import com.adptapaw.backend.entity.AdoptionAnimal;
import com.adptapaw.backend.entity.User;
import com.adptapaw.backend.payload.adoption.AdoptionAnimalDTO;
import com.adptapaw.backend.payload.adoption.AdoptionAnimalResponseDTO;
import com.adptapaw.backend.payload.adoption.AdoptionUserDTO;
import com.adptapaw.backend.repository.AdoptionAnimalRepository;
import com.adptapaw.backend.repository.UserRepository;
import com.adptapaw.backend.service.AdoptionAnimalService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class AdoptionAnimalServiceImplementation implements AdoptionAnimalService {

    private ModelMapper mapper;

    private AdoptionAnimalRepository adoptionAnimalRepository;


    @Autowired
    private UserRepository userRepository;


    public AdoptionAnimalServiceImplementation(ModelMapper mapper, AdoptionAnimalRepository adoptionAnimalRepository) {
        this.mapper = mapper;
        this.adoptionAnimalRepository = adoptionAnimalRepository;
    }

    private AdoptionAnimalDTO mapToDTO(AdoptionAnimal adoptionAnimal){
        AdoptionAnimalDTO adoptionAnimalDTO = mapper.map(adoptionAnimal, AdoptionAnimalDTO.class);
        return adoptionAnimalDTO;
    }

    // convert DTO to entity
    private AdoptionAnimal mapToEntity(AdoptionAnimalDTO adoptionAnimalDTO){
        AdoptionAnimal adoptionAnimal = mapper.map(adoptionAnimalDTO, AdoptionAnimal.class);
        return adoptionAnimal;
    }

//    @Override
//    public AdoptionAnimalDTO getByCreator(Long creator) {
//        AdoptionAnimal adoptionAnimal = (AdoptionAnimal) AdoptionAnimalRepository.findByCreator(String.valueOf(creator));
////                .orElseThrow(() -> new ResourceNotFoundException("Adoption Animal", "id", creator));
//        return mapToDTO(adoptionAnimal);
//    }
//
    @Override
    public AdoptionAnimalResponseDTO getAllByCreator(String id) {

        User user  = userRepository.findById(Long.valueOf(id)).get();
        List<AdoptionAnimal> adoptionAnimal = adoptionAnimalRepository.findAllByUser(user);

        List<AdoptionAnimalDTO> content= adoptionAnimal.stream().map(adoptionAnimalItem -> mapToDTO(adoptionAnimalItem)).collect(Collectors.toList());
        AdoptionAnimalResponseDTO adoptionAnimalResponse = new AdoptionAnimalResponseDTO();
        adoptionAnimalResponse.setContent(content);
        return adoptionAnimalResponse;
    }


    @Override
    public AdoptionAnimalResponseDTO getAllAdoptionAnimals() {
        List<AdoptionAnimal> adoptionAnimal = adoptionAnimalRepository.findAll();

        List<AdoptionAnimalDTO> content= adoptionAnimal.stream().map(adoptionAnimalItem -> mapToDTO(adoptionAnimalItem)).collect(Collectors.toList());


        AdoptionAnimalResponseDTO adoptionAnimalResponse = new AdoptionAnimalResponseDTO();
        adoptionAnimalResponse.setContent(content);

        return adoptionAnimalResponse;
    }

    @Override
    public AdoptionAnimalDTO createAdoptionAnimal(String id, AdoptionAnimalDTO adoptionAnimalDTO) {


        AdoptionAnimal animal = new AdoptionAnimal();
        animal.setBreed(adoptionAnimalDTO.getBreed());
        animal.setBehaviour(adoptionAnimalDTO.getBehaviour());
        animal.setColor(adoptionAnimalDTO.getColor());
        animal.setDescription(adoptionAnimalDTO.getDescription());
        animal.setFood(adoptionAnimalDTO.getFood());
        animal.setGender(adoptionAnimalDTO.getGender());
        animal.setType(adoptionAnimalDTO.getType());
        animal.setLocation(adoptionAnimalDTO.getLocation());
        animal.setName(adoptionAnimalDTO.getName());
        animal.setPhysicalcondition(adoptionAnimalDTO.getPhysicalcondition());
        animal.setTraining(adoptionAnimalDTO.getTraining());
        animal.setVaccine(adoptionAnimalDTO.getVaccine());

        User user = userRepository.findById(Long.valueOf(id)).orElse(null);
        animal.setUser(user);

        adoptionAnimalRepository.save(animal);

        AdoptionUserDTO adoptionUserDTO = new AdoptionUserDTO();

        adoptionUserDTO.setUsername(user.getUsername());
        adoptionUserDTO.setId(user.getId());

        adoptionAnimalDTO.setUser(adoptionUserDTO);


        adoptionAnimalDTO.setId(animal.getId());

//        AdoptionAnimalResponseDTO response = new AdoptionAnimalResponseDTO();


        return adoptionAnimalDTO;



//        AdoptionAnimal adoptionAnimalPost = mapToEntity(adoptionAnimalPostDTO);
//        AdoptionAnimal newAdoptionAnimalPost = adoptionAnimalRepository.save(adoptionAnimalPost);
//
//        // convert entity to DTO
//        AdoptionAnimalDTO adoptionPostResponse = mapToDTO(newAdoptionAnimalPost);
//        return adoptionPostResponse;
    }

    @Override
    public AdoptionAnimalDTO getAllById(String id) {

        AdoptionAnimal adoptionAnimal = adoptionAnimalRepository.findById(Long.valueOf(id)).get();

        return mapToDTO(adoptionAnimal);
    }


}
