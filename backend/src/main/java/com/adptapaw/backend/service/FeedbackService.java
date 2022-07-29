package com.adptapaw.backend.service;


import com.adptapaw.backend.payload.FeedbackDTO;

public interface FeedbackService {
    FeedbackDTO createFeedback(FeedbackDTO feedbackPageDTO);



    FeedbackDTO getById(String id);
}
