package com.adptapaw.backend.service.implementation;



import com.adptapaw.backend.entity.Feedback;
import com.adptapaw.backend.payload.FeedbackDTO;

import com.adptapaw.backend.payload.FeedbackListDTO;
import com.adptapaw.backend.repository.FeedbackRepository;
import com.adptapaw.backend.service.FeedbackService;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class FeedbackServiceImplementation implements FeedbackService {
    private final ModelMapper mapper;
    private final FeedbackRepository feedbackPageRepository;

    public FeedbackServiceImplementation(ModelMapper mapper, FeedbackRepository feedbackPageRepository) {
        this.mapper = mapper;
        this.feedbackPageRepository = feedbackPageRepository;
    }

    private FeedbackDTO mapToFeedbackDTO(Feedback feedbackPage){
        return mapper.map(feedbackPage, FeedbackDTO.class);
    }

    public FeedbackDTO createFeedback(FeedbackDTO feedbackPageDTO) {

        Feedback feedback = new Feedback();
        Date date = new Date();
        feedback.setFeedbackdate(String.valueOf(date));
        feedback.setRating(feedbackPageDTO.getRating());
        feedback.setDescription(feedbackPageDTO.getDescription());

        this.feedbackPageRepository.save(feedback);

        return mapToFeedbackDTO(feedback);
    }

    @Override
    public FeedbackDTO getById(String id) {

        Feedback feedbackPage = feedbackPageRepository.findById(Long.valueOf(id)).get();
        return mapToFeedbackDTO(feedbackPage);
    }
    @Override
    public FeedbackListDTO getAllFeedbacks(int pageNo, int pageSize, String sortBy, String sortDir) {


        Sort sort = sortDir.equalsIgnoreCase(Sort.Direction.ASC.name()) ? Sort.by(sortBy).ascending()
                : Sort.by(sortBy).descending();

        Pageable pageable = PageRequest.of(pageNo, pageSize, sort);

        Page<Feedback> feedbackdemo = feedbackPageRepository.findAll(pageable);

        List<Feedback> feedbacks = feedbackdemo.getContent();

        List<FeedbackDTO> content= feedbacks.stream().map(feedbackItem -> mapToFeedbackDTO(feedbackItem)).collect(Collectors.toList());


        FeedbackListDTO feedbackListDTO = new FeedbackListDTO();
        feedbackListDTO.setContent(content);
        feedbackListDTO.setPageNo(feedbackdemo.getNumber());
        feedbackListDTO.setPageSize(feedbackdemo.getSize());
        feedbackListDTO.setTotalElements(feedbackdemo.getTotalElements());
        feedbackListDTO.setTotalPages(feedbackdemo.getTotalPages());
        feedbackListDTO.setLast(feedbackdemo.isLast());

        return feedbackListDTO;
    }


}
