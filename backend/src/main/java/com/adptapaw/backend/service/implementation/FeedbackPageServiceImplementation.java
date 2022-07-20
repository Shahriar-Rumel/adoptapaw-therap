package com.adptapaw.backend.service.implementation;


import com.adptapaw.backend.entity.FeedbackPage;
import com.adptapaw.backend.payload.FeedbackPageDTO;
import com.adptapaw.backend.repository.FeedbackPageRepository;
import com.adptapaw.backend.service.FeedbackPageService;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
public class FeedbackPageServiceImplementation implements FeedbackPageService {
    private final ModelMapper mapper;
    private final FeedbackPageRepository feedbackPageRepository;



    public FeedbackPageServiceImplementation(ModelMapper mapper, FeedbackPageRepository feedbackPageRepository) {
        this.mapper = mapper;
        this.feedbackPageRepository = feedbackPageRepository;
    }



    private FeedbackPageDTO mapToRequestDTO(FeedbackPage feedbackPage){
        return mapper.map(feedbackPage, FeedbackPageDTO.class);
    }



    public FeedbackPageDTO createFeedback(String id, FeedbackPageDTO feedbackPageDTO) {

        FeedbackPage request = new FeedbackPage();
        Date date = new Date();
        request.setFeedbackdate(String.valueOf(date));
        request.setRating(feedbackPageDTO.getRating());
        request.setDescription(feedbackPageDTO.getDescription());




        this.feedbackPageRepository.save(request);



        return mapToRequestDTO(request);
    }




    @Override
    public FeedbackPageDTO getById(String id) {
        FeedbackPage feedbackPage = feedbackPageRepository.findById(Long.valueOf(id)).get();

        return mapToRequestDTO(feedbackPage);
    }
}
