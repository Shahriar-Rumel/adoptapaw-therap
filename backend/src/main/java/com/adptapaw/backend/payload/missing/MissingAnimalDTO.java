package com.adptapaw.backend.payload.missing;

import com.adptapaw.backend.payload.adoption.AdoptionUserDTO;
import lombok.Data;

@Data
public class MissingAnimalDTO {
    private Long id;
    private String name;
    private String breed;
    private String vaccine;
    private String color;
    private String datemissing;
    private String specificattribute;
    private String location;
    private String accessorieslastworn;
    private String rewards;
    private String gender;
    private String type;
    private Boolean stillmissing;
    private MissingUserDTO user;
}
