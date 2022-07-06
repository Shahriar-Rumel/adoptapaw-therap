package com.adptapaw.backend.payload;

import com.adptapaw.backend.entity.Roles;
import lombok.Data;

import java.util.List;
import java.util.Set;

@Data
public class UserDetailsDTO {

    private String name;
    private String username;
    private String email;
    private Set<Roles> role;
}
