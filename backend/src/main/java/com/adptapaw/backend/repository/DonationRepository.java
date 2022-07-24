package com.adptapaw.backend.repository;



import com.adptapaw.backend.entity.Donation;
import com.adptapaw.backend.entity.DonationPost;
import com.adptapaw.backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DonationRepository extends JpaRepository<Donation,Long> {
    List<Donation> findAllByDonator(User user);
    List<Donation> findAllByDonationpost(DonationPost donationPost);
}
