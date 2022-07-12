package com.adptapaw.backend.service;

import com.adptapaw.backend.payload.adoption.AdoptionRequestDTO;

public interface AdoptionRequestService {
    AdoptionRequestDTO createAdoptionRequest(String uid,String id, AdoptionRequestDTO adoptionRequestDTO);

    AdoptionRequestDTO getAllById(String id);

    AdoptionRequestDTO getAllByCreator(String id);
}
