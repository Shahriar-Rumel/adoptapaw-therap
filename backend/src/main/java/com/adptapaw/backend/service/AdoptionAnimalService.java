package com.adptapaw.backend.service;

import com.adptapaw.backend.payload.adoption.AdoptionAnimalDTO;
import com.adptapaw.backend.payload.adoption.AdoptionAnimalResponseDTO;
import org.springframework.http.ResponseEntity;

public interface AdoptionAnimalService {

    AdoptionAnimalResponseDTO getAllByCreator(String id);

    AdoptionAnimalResponseDTO getAllAdoptionAnimals();

    AdoptionAnimalDTO createAdoptionAnimal(String id,AdoptionAnimalDTO adoptionAnimalDTO);

    AdoptionAnimalDTO getAllById(String id);


    ResponseEntity<?> updateById(String id, AdoptionAnimalDTO adoptionAnimalPostDTO);

    String DeleteById(String id);
}
