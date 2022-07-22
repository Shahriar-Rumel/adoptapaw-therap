package com.adptapaw.backend.payload.donations;

import lombok.Data;

@Data
public class DonationGiverDTO {
    private Long id;

    private String donationdate;
    private Long amountofmoney;
    private DonationUserDTO donationgiver;
    private DonationsDTO donationpost;


}
