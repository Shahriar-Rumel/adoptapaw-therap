package com.adptapaw.backend.service;

import com.adptapaw.backend.payload.adoption.AdoptionRequestDTO;
import com.adptapaw.backend.payload.adoption.AdoptionRequestListDTO;
import com.adptapaw.backend.payload.donations.DonationPostDTO;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;

import java.util.List;

public interface AdoptionRequestService {
    ResponseEntity<?> createAdoptionRequest(String uid, String id, AdoptionRequestDTO adoptionRequestDTO);


    AdoptionRequestListDTO getAllByCreator(String id);

    AdoptionRequestDTO getById(String uid,String id);

    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    AdoptionRequestDTO approveRequest(String Uid,String id);

    AdoptionRequestListDTO getAll(String id, int pageNo, int pageSize, String sortBy, String sortDir);
}
