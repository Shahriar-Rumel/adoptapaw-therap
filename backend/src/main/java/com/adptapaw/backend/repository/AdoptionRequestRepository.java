package com.adptapaw.backend.repository;

import com.adptapaw.backend.entity.AdoptionRequest;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AdoptionRequestRepository extends JpaRepository<AdoptionRequest,Long> {
}
