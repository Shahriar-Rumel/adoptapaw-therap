package com.adptapaw.backend;

import com.adptapaw.backend.context.AbstractEmailContext;
import com.adptapaw.backend.context.AccountVerificationEmailContext;
import com.adptapaw.backend.service.email.EmailService;
import com.cloudinary.Cloudinary;
import com.cloudinary.SingletonManager;
import com.cloudinary.utils.ObjectUtils;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.annotation.Bean;
import org.springframework.context.event.EventListener;
import org.springframework.core.io.FileSystemResource;

import javax.mail.MessagingException;
import java.io.File;
import java.time.LocalDate;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;


@SpringBootApplication
public class BackendApplication {


    @Autowired
    private EmailService emailService;
    @Bean
    public ModelMapper modelMapper(){
        return new ModelMapper();
    }


    public static void main(String[] args) {

        Cloudinary cloudinary = new Cloudinary(ObjectUtils.asMap(
                "cloud_name", "adoptapaw",
                "api_key", "718441248595232",
                "api_secret", "BAywgQHJeEmbc6tzTz5tUkzvZnM"));
        SingletonManager manager = new SingletonManager();
        manager.setCloudinary(cloudinary);
        manager.init();

        SpringApplication.run(BackendApplication.class, args);


    }

      @EventListener(ApplicationReadyEvent.class)
      public void setMail() throws MessagingException {

          AccountVerificationEmailContext mail = new AccountVerificationEmailContext();
          mail.setFrom("adoptapawofficial@gmail.com");
          mail.setTemplateLocation("emailsender.html");
          mail.setSubject("Complete your registration");
          mail.setTo("contactrumel@gmail.com");
          mail.put("name","Just a name");
          mail.put("config","www.google.com");
          FileSystemResource imageResourceName = new FileSystemResource(new File("unsplash.com/photos/LvLlOpu3vzM"));
          mail.put("imageResourceName",imageResourceName);
          emailService.sendMail(mail);


      }


}
