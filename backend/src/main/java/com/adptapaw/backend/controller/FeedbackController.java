package com.adptapaw.backend.controller;


import com.adptapaw.backend.payload.FeedbackDTO;
import com.adptapaw.backend.service.FeedbackService;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins  = "http://localhost:3000")
@RestController
@RequestMapping("/api/feedback")
public class FeedbackController {
    private final FeedbackService feedbackService;

    public FeedbackController(FeedbackService feedbackService) {
        this.feedbackService = feedbackService;
    }

    @PostMapping("/create")
    public FeedbackDTO createFeedback(@RequestBody FeedbackDTO feedbackDTO){
        return feedbackService.createFeedback(feedbackDTO);
    }

    @GetMapping("/{id}")
    public FeedbackDTO getFeedbackById(@PathVariable(name="id") String id){
        return feedbackService.getById(id);
    }
}
