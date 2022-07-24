package com.adptapaw.backend.payload.donations;

import lombok.Data;

@Data
public class DonationDTO {
    private Long id;

    private String donationdate;
    private Long amountofmoney;
    private DonationUserDTO donator;
    private DonationPostDTO donationpost;


}
