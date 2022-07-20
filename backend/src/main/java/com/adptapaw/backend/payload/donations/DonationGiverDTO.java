package com.adptapaw.backend.payload.donations;

import lombok.Data;

@Data
public class DonationGiverDTO {
    private Long id;

    private String requestdate;
    private Long amountofmoney;
    private DonationUserDTO donationgiver;
    private DonationsDTO donationpost;


}
