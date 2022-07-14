package com.adptapaw.backend.service.implementation;

import com.cloudinary.Cloudinary;
import com.cloudinary.Singleton;
import com.cloudinary.utils.ObjectUtils;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;

@Service
public class CloudinaryService {

    private final Cloudinary cloudinary = Singleton.getCloudinary();

    public String upload(MultipartFile multipartFile) throws IOException {
        Map uploadResult = cloudinary.uploader().upload(multipartFile.getBytes(), ObjectUtils.emptyMap());
//        https://res.cloudinary.com/adoptapaw/image/upload/v1657812086/my0rxrlvcewesnwe7izs.jpg

//        String imageurl = "https://res.cloudinary.com/adoptapaw/image/upload/v1657812086/"+uploadResult.get("public_id").toString()+".jpg";

        String imageurl = uploadResult.get("url").toString();

        return imageurl;
    }
}
