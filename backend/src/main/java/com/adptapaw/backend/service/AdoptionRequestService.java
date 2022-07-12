package com.adptapaw.backend.service;

import com.adptapaw.backend.payload.adoption.AdoptionRequestDTO;
import com.adptapaw.backend.payload.adoption.AdoptionRequestListDTO;

import java.util.List;

public interface AdoptionRequestService {
    AdoptionRequestDTO createAdoptionRequest(String uid,String id, AdoptionRequestDTO adoptionRequestDTO);


    AdoptionRequestListDTO getAllByCreator(String id);

    AdoptionRequestDTO getById(String uid,String id);
}
