package com.adptapaw.backend.repository;



import com.adptapaw.backend.entity.Donation;
import com.adptapaw.backend.entity.DonationPost;
import com.adptapaw.backend.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DonationRepository extends JpaRepository<Donation,Long> {
    Page<Donation> findAllByDonator(User user, Pageable pageable);
    List<Donation> findAllByDonationpost(DonationPost donationPost);
}
