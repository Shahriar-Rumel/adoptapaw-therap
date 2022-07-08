package com.adptapaw.backend.repository;

import com.adptapaw.backend.entity.AdoptionAnimal;
import com.adptapaw.backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AdoptionAnimalRepository extends JpaRepository<AdoptionAnimal,Long> {
    List<AdoptionAnimal> findAllByUser(User user);
}
