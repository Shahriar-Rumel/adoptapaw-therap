package com.adptapaw.backend.repository;



import com.adptapaw.backend.entity.MissingAnimal;
import com.adptapaw.backend.entity.MissingRequest;
import org.springframework.data.jpa.repository.JpaRepository;

import javax.transaction.Transactional;
import java.util.List;

public interface MissingRequestRepository extends JpaRepository<MissingRequest,Long> {

    void deleteAllById(Long id);

    List<MissingRequest> findAllByPetId(Long valueOf);

    void deleteAllByPetId(Long valueOf);

    MissingRequest findByPetId(Long id);

    MissingRequest findByPet(MissingAnimal animal);

    List<MissingRequest> findAllByPet(MissingAnimal animal);

    @Transactional
    void deleteAllByPet(MissingAnimal animal);
}
