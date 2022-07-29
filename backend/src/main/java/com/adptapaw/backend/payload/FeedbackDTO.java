package com.adptapaw.backend.payload;

import lombok.Data;

@Data
public class FeedbackDTO {
    private Long id;
    private Long rating;
    private String description;
    private String feedbackdate;
}
