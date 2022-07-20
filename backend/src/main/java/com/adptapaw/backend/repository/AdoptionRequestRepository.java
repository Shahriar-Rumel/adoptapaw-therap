package com.adptapaw.backend.repository;

import com.adptapaw.backend.entity.AdoptionAnimal;
import com.adptapaw.backend.entity.AdoptionRequest;
import com.adptapaw.backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import javax.transaction.Transactional;
import java.util.List;

public interface AdoptionRequestRepository extends JpaRepository<AdoptionRequest,Long> {

    List<AdoptionRequest> findAllByAdoptionseeker(User user);
    

    void deleteAllById(Long id);

    List<AdoptionRequest> findAllByPetId(Long valueOf);

    void deleteAllByPetId(Long valueOf);

    AdoptionRequest findByPetId(Long id);

    AdoptionRequest findByPet(AdoptionAnimal animal);

    List<AdoptionRequest> findAllByPet(AdoptionAnimal animal);

    @Transactional
    void deleteAllByPet(AdoptionAnimal animal);
}
