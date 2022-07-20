package com.adptapaw.backend.repository;


import com.adptapaw.backend.entity.DonationGiver;
import com.adptapaw.backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DonationGiverRepository extends JpaRepository<DonationGiver,Long> {
    List<DonationGiver> findAllByDonationgiver(User user);
}
