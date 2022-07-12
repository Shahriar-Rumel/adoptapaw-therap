package com.adptapaw.backend.repository;

import com.adptapaw.backend.entity.AdoptionRequest;
import com.adptapaw.backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AdoptionRequestRepository extends JpaRepository<AdoptionRequest,Long> {

    List<AdoptionRequest> findAllByAdoptionseeker(User user);
}
