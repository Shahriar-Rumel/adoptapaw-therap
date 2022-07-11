package com.adptapaw.backend.payload.adoption;

import lombok.Data;

@Data
public class AdoptionAnimalDTO {
    private Long id;
    private String name;
    private String breed;
    private String training;
    private String vaccine;
    private String color;
    private String description;
    private String physicalcondition;
    private String location;
    private String behaviour;
    private String food;
    private String gender;
    private String type;
    private Boolean availability;
    private AdoptionUserDTO user;

}
