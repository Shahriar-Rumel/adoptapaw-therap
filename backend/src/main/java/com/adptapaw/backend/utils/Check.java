package com.adptapaw.backend.utils;

import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

public class Check {

    public Boolean isMatch = passwordEncoder().matches("rumel","$2a$10$x4CXdGXFmGnW5BgNlHHBkOaKzMnygGxHBvRna.AQlMJzg/FuQVhmS");
    public void check(){
        System.out.println(isMatch);
    }
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

}
