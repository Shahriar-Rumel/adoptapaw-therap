package com.adptapaw.backend.repository;

import com.adptapaw.backend.entity.AdoptionAnimal;
import com.adptapaw.backend.entity.User;
import com.adptapaw.backend.payload.AdoptionAnimalDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface AdoptionAnimalRepository extends JpaRepository<AdoptionAnimal,Long> {


    List<AdoptionAnimal> findAllByUser(User user);



}
