package com.adptapaw.backend.payload;

import com.adptapaw.backend.payload.adoption.AdoptionAnimalDTO;
import lombok.Data;

import java.util.List;

@Data
public class AllUserResponseDTO {
    private List<UserDetailsDTO> content;
    private int pageNo;
    private int pageSize;
    private long totalElements;
    private int totalPages;
    private boolean last;
}
