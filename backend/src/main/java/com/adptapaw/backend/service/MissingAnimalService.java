package com.adptapaw.backend.service;

import com.adptapaw.backend.payload.adoption.AdoptionAnimalDTO;
import com.adptapaw.backend.payload.adoption.AdoptionAnimalResponseDTO;
import com.adptapaw.backend.payload.missing.MissingAnimalDTO;
import com.adptapaw.backend.payload.missing.MissingAnimalResponseDTO;
import org.springframework.http.ResponseEntity;

public interface MissingAnimalService {
    ResponseEntity<?> getAllByCreator(String id, int pageNo, int pageSize, String sortBy, String sortDir);

    MissingAnimalResponseDTO getAllMissingAnimals(int pageNo, int pageSize, String sortBy, String sortDir);

    MissingAnimalDTO createMissingAnimal(String id, MissingAnimalDTO missingAnimalDTO);

    MissingAnimalDTO getAllById(String id);

    MissingAnimalDTO updateById(String id, MissingAnimalDTO missingAnimalDTO);

    String DeleteById(String id);
}
