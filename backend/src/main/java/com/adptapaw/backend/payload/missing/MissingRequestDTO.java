package com.adptapaw.backend.payload.missing;

import lombok.Data;

@Data
public class MissingRequestDTO {

    private Long id;
    private String requestdate;

    private String approveddate;

    private Boolean status;
    private String location;
    private  String image;
    private String mobile;

    private String email;

    private MissingAnimalDTO pet;
}
