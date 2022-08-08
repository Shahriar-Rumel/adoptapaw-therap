package com.adptapaw.backend.service;


import com.adptapaw.backend.entity.MissingRequest;


import com.adptapaw.backend.payload.missing.MissingRequestDTO;
import com.adptapaw.backend.payload.missing.MissingRequestListDTO;

import java.util.List;

public interface MissingRequestService {
    MissingRequestDTO createMissingRequest(String id, MissingRequestDTO missingRequestDTO);


    MissingRequestDTO getById(String id);
    MissingRequestListDTO getAll(String id, int pageNo, int pageSize, String sortBy, String sortDir);
    MissingRequestDTO approveInfo(String uid, String id);

}
