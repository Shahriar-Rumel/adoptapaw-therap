package com.adptapaw.backend.service;


import com.adptapaw.backend.payload.donations.DonationsDTO;
import com.adptapaw.backend.payload.donations.DonationsResponseDTO;

public interface DonationsService {
    DonationsResponseDTO getAllDonationsPosts();

    DonationsDTO createDonationsPost(String id, DonationsDTO donationsDTO);

    DonationsDTO getAllById(String id);
}
