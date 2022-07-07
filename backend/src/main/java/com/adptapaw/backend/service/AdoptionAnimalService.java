package com.adptapaw.backend.service;

import com.adptapaw.backend.entity.User;
import com.adptapaw.backend.payload.AdoptionAnimalAllDTO;
import com.adptapaw.backend.payload.AdoptionAnimalDTO;
import com.adptapaw.backend.payload.AdoptionAnimalResponseDTO;

import java.util.List;

public interface AdoptionAnimalService {
//    List<AdoptionAnimalDTO> getPostByCreator(long id);

//    AdoptionAnimalDTO getByCreator(Long creator);
    AdoptionAnimalResponseDTO getAllByCreator(String id);

    AdoptionAnimalResponseDTO getAllAdoptionAnimals();

    AdoptionAnimalDTO createAdoptionAnimal(String id,AdoptionAnimalDTO adoptionAnimalDTO);
}
