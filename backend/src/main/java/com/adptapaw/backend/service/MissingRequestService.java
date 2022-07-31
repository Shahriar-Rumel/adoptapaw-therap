package com.adptapaw.backend.service;


import com.adptapaw.backend.entity.MissingRequest;
import com.adptapaw.backend.payload.missing.MissingRequestDTO;

import java.util.List;

public interface MissingRequestService {
    MissingRequestDTO createMissingRequest(String id, MissingRequestDTO missingRequestDTO);


    //MissingRequestListDTO getAllByCreator(String id);

    MissingRequestDTO getById(String id);

}
