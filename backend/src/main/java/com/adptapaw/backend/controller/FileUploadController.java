package com.adptapaw.backend.controller;

import com.adptapaw.backend.service.implementation.CloudinaryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;


import java.io.IOException;

import static java.nio.file.Files.copy;
import static java.nio.file.Paths.get;

@CrossOrigin(origins  = ("${site.base.url.https}"))
@RestController
@RequestMapping("/api/files")
public class FileUploadController {

        @Autowired
        CloudinaryService cloudinaryService;

        public static final String DIRECTORY = System.getProperty("user.root") + "/Uploads";

        @PostMapping("/upload")
        public String uploadFiles(@RequestParam("file")MultipartFile multipartFile) throws IOException{

                return cloudinaryService.upload(multipartFile);
        }

}
