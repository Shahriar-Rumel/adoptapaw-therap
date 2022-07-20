package com.adptapaw.backend.service;

import com.adptapaw.backend.payload.adoption.AdoptionRequestDTO;
import com.adptapaw.backend.payload.adoption.AdoptionRequestListDTO;
import org.springframework.security.access.prepost.PreAuthorize;

import java.util.List;

public interface AdoptionRequestService {
    AdoptionRequestDTO createAdoptionRequest(String uid,String id, AdoptionRequestDTO adoptionRequestDTO);


    AdoptionRequestListDTO getAllByCreator(String id);

    AdoptionRequestDTO getById(String uid,String id);

    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    AdoptionRequestDTO approveRequest(String Uid,String id);
}
