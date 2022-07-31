package com.adptapaw.backend.payload;

import lombok.Data;

@Data
public class StatsDTO {
    private Long userSize;
    private Long adoptionRequestSize;
    private Long missingPostSize;
    private Long missingInformationSize;
    private Long adoptionAnimalSize;
    private Long donationSize;
}
