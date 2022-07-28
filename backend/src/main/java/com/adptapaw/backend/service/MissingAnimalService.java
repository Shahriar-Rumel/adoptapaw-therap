package com.adptapaw.backend.service;

import com.adptapaw.backend.payload.adoption.AdoptionAnimalDTO;
import com.adptapaw.backend.payload.adoption.AdoptionAnimalResponseDTO;
import com.adptapaw.backend.payload.missing.MissingAnimalDTO;
import com.adptapaw.backend.payload.missing.MissingAnimalResponseDTO;

public interface MissingAnimalService {
    MissingAnimalResponseDTO getAllByCreator(String id);

    MissingAnimalResponseDTO getAllMissingAnimals(int pageNo, int pageSize, String sortBy, String sortDir);

    MissingAnimalDTO createMissingAnimal(String id, MissingAnimalDTO missingAnimalDTO);

    MissingAnimalDTO getAllById(String id);

    MissingAnimalDTO updateById(String id, MissingAnimalDTO missingAnimalDTO);

    String DeleteById(String id);
}
