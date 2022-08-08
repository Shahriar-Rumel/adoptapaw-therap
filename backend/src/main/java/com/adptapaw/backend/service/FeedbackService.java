package com.adptapaw.backend.service;


import com.adptapaw.backend.payload.FeedbackDTO;
import com.adptapaw.backend.payload.FeedbackListDTO;


public interface FeedbackService {
    FeedbackDTO createFeedback(FeedbackDTO feedbackPageDTO);
    FeedbackListDTO getAllFeedbacks(int pageNo, int pageSize, String sortBy, String sortDir);



    FeedbackDTO getById(String id);
}
