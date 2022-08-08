package com.adptapaw.backend.controller;

import com.adptapaw.backend.service.email.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;



@RestController
@RequestMapping("/email")
public class EmailController {

    @Autowired
    EmailService emailService;


}