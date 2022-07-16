package com.adptapaw.backend.repository;

import com.adptapaw.backend.entity.Donations;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DonationsRepository extends JpaRepository<Donations, Long> {
}
