package com.adptapaw.backend.service;

import com.adptapaw.backend.payload.donations.DonationListDTO;
import com.adptapaw.backend.payload.donations.DonationDTO;
import org.springframework.http.ResponseEntity;

public interface DonationService {
    DonationDTO createDonation(String uid, String id, DonationDTO donationDTO);


    ResponseEntity<?> getAllByCreator(String id, int pageNo,  int pageSize, String sortBy,String sortDir);

    DonationDTO getById(String uid, String id);
}

