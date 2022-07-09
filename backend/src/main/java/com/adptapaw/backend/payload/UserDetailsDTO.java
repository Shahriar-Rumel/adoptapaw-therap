package com.adptapaw.backend.payload;

import com.adptapaw.backend.entity.Roles;
import lombok.Data;

import java.util.Set;

@Data
public class UserDetailsDTO {

    private Long id;
    private String name;
    private String username;
    private String email;
    private Set<Roles> role;
    private JWTDTO jwtdto;
}
