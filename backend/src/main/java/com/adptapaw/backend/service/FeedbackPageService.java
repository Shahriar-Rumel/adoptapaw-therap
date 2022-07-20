package com.adptapaw.backend.service;


import com.adptapaw.backend.payload.FeedbackPageDTO;

public interface FeedbackPageService {
    FeedbackPageDTO createFeedback(String id, FeedbackPageDTO feedbackPageDTO);



    FeedbackPageDTO getById(String id);
}
