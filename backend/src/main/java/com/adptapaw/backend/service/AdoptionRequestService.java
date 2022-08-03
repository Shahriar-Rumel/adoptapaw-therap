package com.adptapaw.backend.service;

import com.adptapaw.backend.payload.adoption.AdoptionRequestDTO;
import com.adptapaw.backend.payload.adoption.AdoptionRequestListDTO;
import org.springframework.http.ResponseEntity;


public interface AdoptionRequestService {
    ResponseEntity<?> createAdoptionRequest(String uid, String id, AdoptionRequestDTO adoptionRequestDTO);


    AdoptionRequestListDTO getAllByCreator(String id);

    AdoptionRequestDTO getById(String uid,String id);

    AdoptionRequestDTO approveRequest(String uid,String id);

    AdoptionRequestListDTO getAll(String id, int pageNo, int pageSize, String sortBy, String sortDir);
}
