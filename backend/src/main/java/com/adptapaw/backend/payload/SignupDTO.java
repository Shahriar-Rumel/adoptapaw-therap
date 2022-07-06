package com.adptapaw.backend.payload;

import lombok.Data;

@Data
public class SignupDTO {
    private String Name;
    private String Email;
    private String Password;
}
