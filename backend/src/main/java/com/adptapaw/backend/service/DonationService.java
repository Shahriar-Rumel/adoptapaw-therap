package com.adptapaw.backend.service;

import com.adptapaw.backend.payload.donations.DonationListDTO;
import com.adptapaw.backend.payload.donations.DonationDTO;

public interface DonationService {
    DonationDTO createDonation(String uid, String id, DonationDTO donationDTO);


    DonationListDTO getAllByCreator(String id);

    DonationDTO getById(String uid, String id);
}

