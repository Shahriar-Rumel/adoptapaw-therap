package com.adptapaw.backend.service;

import com.adptapaw.backend.entity.DonationGiver;
import com.adptapaw.backend.payload.donations.DonationGivenListDTO;
import com.adptapaw.backend.payload.donations.DonationGiverDTO;

public interface DonationGiverService {
    DonationGiverDTO createDonationRequest(String uid, String id, DonationGiverDTO donationGiverDTO);


    DonationGivenListDTO getAllByCreator(String id);

    DonationGiverDTO getById(String uid, String id);
}

