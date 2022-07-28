package com.adptapaw.backend.service.implementation;

import com.adptapaw.backend.entity.AdoptionAnimal;
import com.adptapaw.backend.entity.AdoptionRequest;
import com.adptapaw.backend.entity.User;
import com.adptapaw.backend.payload.adoption.AdoptionAnimalDTO;
import com.adptapaw.backend.payload.adoption.AdoptionAnimalResponseDTO;
import com.adptapaw.backend.payload.adoption.AdoptionUserDTO;
import com.adptapaw.backend.repository.AdoptionAnimalRepository;
import com.adptapaw.backend.repository.AdoptionRequestRepository;
import com.adptapaw.backend.repository.UserRepository;
import com.adptapaw.backend.service.AdoptionAnimalService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
public class AdoptionAnimalServiceImplementation implements AdoptionAnimalService {

    private final ModelMapper mapper;

    private final AdoptionAnimalRepository adoptionAnimalRepository;

    private final AdoptionRequestRepository adoptionRequestRepository;


    @Autowired
    private UserRepository userRepository;


    public AdoptionAnimalServiceImplementation(ModelMapper mapper, AdoptionAnimalRepository adoptionAnimalRepository, AdoptionRequestRepository adoptionRequestRepository) {
        this.mapper = mapper;
        this.adoptionAnimalRepository = adoptionAnimalRepository;
        this.adoptionRequestRepository = adoptionRequestRepository;
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
    public AdoptionAnimalResponseDTO getAllAdoptionAnimals(int pageNo,  int pageSize, String sortBy,String sortDir) {


        Sort sort = sortDir.equalsIgnoreCase(Sort.Direction.ASC.name()) ? Sort.by(sortBy).ascending()
                : Sort.by(sortBy).descending();

        Pageable pageable = PageRequest.of(pageNo, pageSize, sort);

        Page<AdoptionAnimal> animals = adoptionAnimalRepository.findAll(pageable);

        List<AdoptionAnimal> adoptionAnimal = animals.getContent();

        List<AdoptionAnimalDTO> content= adoptionAnimal.stream().map(adoptionAnimalItem -> mapToDTO(adoptionAnimalItem)).collect(Collectors.toList());


        AdoptionAnimalResponseDTO adoptionAnimalResponse = new AdoptionAnimalResponseDTO();
        adoptionAnimalResponse.setContent(content);
        adoptionAnimalResponse.setPageNo(animals.getNumber());
        adoptionAnimalResponse.setPageSize(animals.getSize());
        adoptionAnimalResponse.setTotalElements(animals.getTotalElements());
        adoptionAnimalResponse.setTotalPages(animals.getTotalPages());
        adoptionAnimalResponse.setLast(animals.isLast());

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
        animal.setImageone(adoptionAnimalDTO.getImageone());
        animal.setImagetwo(adoptionAnimalDTO.getImagetwo());
        animal.setImagethree(adoptionAnimalDTO.getImagethree());

        animal.setAvailability(true);

        User user = userRepository.findById(Long.valueOf(id)).orElse(null);
        animal.setUser(user);

        adoptionAnimalRepository.save(animal);

        AdoptionUserDTO adoptionUserDTO = new AdoptionUserDTO();

        adoptionUserDTO.setUsername(user.getUsername());
        adoptionUserDTO.setId(user.getId());

        adoptionAnimalDTO.setUser(adoptionUserDTO);


        adoptionAnimalDTO.setId(animal.getId());

        return adoptionAnimalDTO;

    }

    @Override
    public AdoptionAnimalDTO getAllById(String id) {

        AdoptionAnimal adoptionAnimal = adoptionAnimalRepository.findById(Long.valueOf(id)).get();

        return mapToDTO(adoptionAnimal);
    }

    @Override
    public ResponseEntity<?> updateById(String id, AdoptionAnimalDTO adoptionAnimalDTO) {

        AdoptionAnimal adoptionAnimal = adoptionAnimalRepository.findById(Long.valueOf(id)).get();

        Authentication auth = SecurityContextHolder.getContext().getAuthentication();

        if(!Objects.equals(adoptionAnimal.getUser().getEmail(), auth.getName())){
            return new ResponseEntity<>("Not authorized to make changes",HttpStatus.BAD_REQUEST);
        }


        adoptionAnimal.setBreed(adoptionAnimalDTO.getBreed());
        adoptionAnimal.setBehaviour(adoptionAnimalDTO.getBehaviour());
        adoptionAnimal.setColor(adoptionAnimalDTO.getColor());
        adoptionAnimal.setDescription(adoptionAnimalDTO.getDescription());
        adoptionAnimal.setFood(adoptionAnimalDTO.getFood());
        adoptionAnimal.setGender(adoptionAnimalDTO.getGender());
        adoptionAnimal.setType(adoptionAnimalDTO.getType());
        adoptionAnimal.setLocation(adoptionAnimalDTO.getLocation());
        adoptionAnimal.setName(adoptionAnimalDTO.getName());
        adoptionAnimal.setPhysicalcondition(adoptionAnimalDTO.getPhysicalcondition());
        adoptionAnimal.setTraining(adoptionAnimalDTO.getTraining());
        adoptionAnimal.setVaccine(adoptionAnimalDTO.getVaccine());
        adoptionAnimal.setImageone(adoptionAnimalDTO.getImageone());
        adoptionAnimal.setImagetwo(adoptionAnimalDTO.getImagetwo());
        adoptionAnimal.setImagethree(adoptionAnimalDTO.getImagethree());

        adoptionAnimalRepository.save(adoptionAnimal);

        return new ResponseEntity<>(mapToDTO(adoptionAnimal),HttpStatus.OK);


    }

    @Override
    public String DeleteById(String id) {

        AdoptionAnimal animal = adoptionAnimalRepository.findById(Long.valueOf(id)).get();
        List<AdoptionRequest>animalRequestList = adoptionRequestRepository.findAllByPet(animal);

        for (AdoptionRequest adoptionRequest : animalRequestList) {
            adoptionRequest.setAdoptionseeker(null);
            adoptionRequest.setPet(null);
            adoptionRequestRepository.deleteById(adoptionRequest.getId());
        }

        animal.setUser(null);
        adoptionAnimalRepository.delete(animal);

        return "Post Deleted Successfully " + animal.getId();
    }


}
