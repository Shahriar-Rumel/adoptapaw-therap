package com.adptapaw.backend.payload;

import com.adptapaw.backend.entity.AdoptionAnimal;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
public class SignupDTO {
    private String name;
    private String username;
    private String email;
    private String password;
}
