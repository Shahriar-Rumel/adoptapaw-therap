package com.adptapaw.backend.service;


import com.adptapaw.backend.payload.missing.MissingRequestDTO;

public interface MissingRequestService {
    MissingRequestDTO createMissingRequest(String id, MissingRequestDTO missingRequestDTO);


    //MissingRequestListDTO getAllByCreator(String id);

    MissingRequestDTO getById(String id);

}
