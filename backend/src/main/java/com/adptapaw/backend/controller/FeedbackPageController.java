package com.adptapaw.backend.controller;


import com.adptapaw.backend.payload.FeedbackPageDTO;
import com.adptapaw.backend.service.FeedbackPageService;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins  = "http://localhost:3000")
@RestController
@RequestMapping("/api")
public class FeedbackPageController {
    private final FeedbackPageService feedbackPageService;

    public FeedbackPageController(FeedbackPageService feedbackPageService) {
        this.feedbackPageService = feedbackPageService;
    }

    @PostMapping("/feedback/{id}/createfeedbackPage")
    public FeedbackPageDTO createFeedback(@PathVariable(name="id") String id, @RequestBody FeedbackPageDTO feedbackPageDTO){
        return feedbackPageService.createFeedback(id,feedbackPageDTO);
    }

    @GetMapping("/feedback/request/{id}")
    public FeedbackPageDTO getMissingRequestById(@PathVariable(name="id") String id){
        return feedbackPageService.getById(id);
    }
}
