package com.adptapaw.backend.payload;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AdoptionAnimalAllDTO {
    private List<AdoptionAnimalResponseDTO> content;
//    private int pageNo;
//    private int pageSize;
//    private long totalElements;
//    private int totalPages;
//    private boolean last;
}
