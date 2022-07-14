package com.adptapaw.backend;

import com.cloudinary.Cloudinary;
import com.cloudinary.SingletonManager;
import com.cloudinary.utils.ObjectUtils;
import org.modelmapper.ModelMapper;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.util.HashMap;
import java.util.Map;

@SpringBootApplication
public class BackendApplication {

//    @Bean
//    public Cloudinary cloudinaryConfig() {
//        Cloudinary cloudinary = new Cloudinary(ObjectUtils.asMap(
//                "cloud_name", "adoptapaw",
//                "api_key", "718441248595232",
//                "api_secret", "BAywgQHJeEmbc6tzTz5tUkzvZnM",
//                "secure", true));
//        return cloudinary;
//    }

    @Bean
    public ModelMapper modelMapper(){
        return new ModelMapper();
    }


    public static void main(String[] args) {

        Cloudinary cloudinary = new Cloudinary(ObjectUtils.asMap(
                "cloud_name", "adoptapaw", // insert here you cloud name
                "api_key", "718441248595232", // insert here your api code
                "api_secret", "BAywgQHJeEmbc6tzTz5tUkzvZnM")); // insert here your api secret
        SingletonManager manager = new SingletonManager();
        manager.setCloudinary(cloudinary);
        manager.init();

        SpringApplication.run(BackendApplication.class, args);
    }

}
