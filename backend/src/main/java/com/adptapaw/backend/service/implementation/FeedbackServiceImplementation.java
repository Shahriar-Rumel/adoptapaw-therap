package com.adptapaw.backend.service.implementation;


import com.adptapaw.backend.entity.Feedback;
import com.adptapaw.backend.payload.FeedbackDTO;
import com.adptapaw.backend.repository.FeedbackRepository;
import com.adptapaw.backend.service.FeedbackService;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
public class FeedbackServiceImplementation implements FeedbackService {
    private final ModelMapper mapper;
    private final FeedbackRepository feedbackPageRepository;

    public FeedbackServiceImplementation(ModelMapper mapper, FeedbackRepository feedbackPageRepository) {
        this.mapper = mapper;
        this.feedbackPageRepository = feedbackPageRepository;
    }

    private FeedbackDTO mapToRequestDTO(Feedback feedbackPage){
        return mapper.map(feedbackPage, FeedbackDTO.class);
    }

    public FeedbackDTO createFeedback(FeedbackDTO feedbackPageDTO) {

        Feedback request = new Feedback();
        Date date = new Date();
        request.setFeedbackdate(String.valueOf(date));
        request.setRating(feedbackPageDTO.getRating());
        request.setDescription(feedbackPageDTO.getDescription());

        this.feedbackPageRepository.save(request);

        return mapToRequestDTO(request);
    }

    @Override
    public FeedbackDTO getById(String id) {

        Feedback feedbackPage = feedbackPageRepository.findById(Long.valueOf(id)).get();
        return mapToRequestDTO(feedbackPage);
    }
}
