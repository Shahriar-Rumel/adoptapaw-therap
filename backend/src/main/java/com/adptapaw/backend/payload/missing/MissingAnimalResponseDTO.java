package com.adptapaw.backend.payload.missing;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MissingAnimalResponseDTO {
    private List<MissingAnimalDTO>contentfile;
}
