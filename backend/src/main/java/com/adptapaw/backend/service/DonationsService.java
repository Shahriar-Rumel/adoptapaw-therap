package com.adptapaw.backend.service;



import com.adptapaw.backend.payload.donations.DonationsDTO;
import com.adptapaw.backend.payload.donations.DonationsResponseDTO;

public interface DonationsService {
    DonationsResponseDTO getAllDonationsPosts();

    DonationsDTO createDonationsPost(DonationsDTO donationsDTO);

    DonationsDTO getAllById(String id);

    DonationsDTO updateById(String id, DonationsDTO donationsDTO);

    String DeleteById(String id);
}
