package com.adptapaw.backend.repository;

import com.adptapaw.backend.entity.AdoptionRequests;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AdoptionRequestRepository extends JpaRepository<AdoptionRequests,Long> {
}
