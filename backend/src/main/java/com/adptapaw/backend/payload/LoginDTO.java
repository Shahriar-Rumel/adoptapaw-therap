package com.adptapaw.backend.payload;

import lombok.Data;

@Data
public class LoginDTO {
    private long id;
    private String email;
    private String password;
    private String dp;
}
