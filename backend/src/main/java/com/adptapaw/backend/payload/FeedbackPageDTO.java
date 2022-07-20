package com.adptapaw.backend.payload;

import lombok.Data;

@Data
public class FeedbackPageDTO {
    private Long id;
    private Long rating;
    private String description;
    private String feedbackdate;
}
