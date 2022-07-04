package com.adptapaw.backend.Controller;

import com.adptapaw.backend.Model.User;
import com.adptapaw.backend.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;


@RestController
public class UserController {
    @Autowired
    private UserRepository repository;

    @PostMapping("/createuser")
    public String createUser(@RequestBody User user){
        repository.save(user);
        return "User Created "+ user.getName();
    }
}