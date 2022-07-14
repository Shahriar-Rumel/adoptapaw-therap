package com.adptapaw.backend.controller;

import com.adptapaw.backend.service.implementation.CloudinaryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;


import java.io.IOException;

import static java.nio.file.Files.copy;
import static java.nio.file.Paths.get;

@CrossOrigin(origins  = "http://localhost:3000")
@RestController
@RequestMapping("/api/files")
public class FileUploadController {

        @Autowired
        CloudinaryService cloudinaryService;

        public static final String DIRECTORY = System.getProperty("user.root") + "/Uploads";

        @PostMapping("/upload")
        public String uploadFiles(@RequestParam("file")MultipartFile multipartFile) throws IOException{

//                String filename = StringUtils.cleanPath(multipartFile.getOriginalFilename());
////                Path fileStorage = get(DIRECTORY,filename).toAbsolutePath().normalize();
////                copy(,fileStorage,REPLACE_EXISTING);
//                Map uploadResult = cloudinary.uploader().upload(multipartFile.getInputStream(), ObjectUtils.emptyMap());
//                System.out.println(uploadResult);

                return cloudinaryService.upload(multipartFile);
//                return  ResponseEntity.ok().body(filename);
        }

}
