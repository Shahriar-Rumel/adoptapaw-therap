package com.adptapaw.backend.repository;


import com.adptapaw.backend.entity.MissingRequest;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MissingRequestRepository extends JpaRepository<MissingRequest,Long> {
}
