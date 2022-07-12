package com.adptapaw.backend.payload.adoption;

import com.adptapaw.backend.entity.AdoptionAnimal;
import com.adptapaw.backend.entity.User;
import lombok.Data;

import javax.persistence.*;

@Data
public class AdoptionRequestDTO {

    private Long id;

    private String requestdate;

    private String approveddate;

    private Boolean status;

    private String rfa;

    private Boolean hadpet;

    private Boolean pickup;

    private String mobile;

    private String email;

    private AdoptionUserDTO adoptionseeker;

    private AdoptionAnimalDTO pet;
}
