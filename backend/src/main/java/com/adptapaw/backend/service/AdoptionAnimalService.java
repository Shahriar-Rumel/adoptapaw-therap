package com.adptapaw.backend.service;

import com.adptapaw.backend.payload.AdoptionAnimalDTO;
import com.adptapaw.backend.payload.AdoptionAnimalResponseDTO;

import java.util.List;

public interface AdoptionAnimalService {
//    AdoptionAnimalDTO getByCreator(Long creator);
//    AdoptionAnimalResponseDTO getAllByCreator(Long creator);

    AdoptionAnimalResponseDTO getAllAdoptionAnimals();
}
