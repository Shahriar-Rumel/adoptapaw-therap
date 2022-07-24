package com.adptapaw.backend.payload.donations;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DonationPostResponseDTO {
    List<DonationPostDTO> content;
}
