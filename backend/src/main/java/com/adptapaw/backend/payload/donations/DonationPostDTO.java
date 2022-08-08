package com.adptapaw.backend.payload.donations;

import lombok.Data;

@Data
public class DonationPostDTO {
    private Long id;
    private String name;
    private String type;
    private String description;
    private Long targetamount;
    private Long remainingamount;
    private Long peopledonated;
    private String image;
    private String location;
    private String creationtime;
}
