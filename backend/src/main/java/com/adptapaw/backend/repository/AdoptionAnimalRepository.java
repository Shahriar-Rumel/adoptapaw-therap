package com.adptapaw.backend.repository;

import com.adptapaw.backend.entity.AdoptionAnimal;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface AdoptionAnimalRepository extends JpaRepository<AdoptionAnimal,Long> {

//    List<AdoptionAnimal> findByCreator(String creator);
//
//    List<AdoptionAnimal> findAllByCreator(String creator);
}
