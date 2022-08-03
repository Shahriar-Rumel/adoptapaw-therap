package com.adptapaw.backend.payload.adoption;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
@Data
@AllArgsConstructor
@NoArgsConstructor
public class AdoptionRequestListDTO {
    private List<AdoptionRequestDTO> content;
    private int pageNo;
    private int pageSize;
    private long totalElements;
    private int totalPages;
    private boolean last;
}

