package com.adptapaw.backend.service;

import com.adptapaw.backend.payload.adoption.AdoptionAnimalDTO;
import com.adptapaw.backend.payload.adoption.AdoptionAnimalResponseDTO;

public interface AdoptionAnimalService {

    AdoptionAnimalResponseDTO getAllByCreator(String id);

    AdoptionAnimalResponseDTO getAllAdoptionAnimals();

    AdoptionAnimalDTO createAdoptionAnimal(String id,AdoptionAnimalDTO adoptionAnimalDTO);

    AdoptionAnimalDTO getAllById(String id);


    AdoptionAnimalDTO updateById(String id, AdoptionAnimalDTO adoptionAnimalPostDTO);
}
