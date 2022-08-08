package com.adptapaw.backend.controller;


import com.adptapaw.backend.payload.FeedbackDTO;
import com.adptapaw.backend.payload.FeedbackListDTO;
import com.adptapaw.backend.payload.adoption.AdoptionAnimalResponseDTO;
import com.adptapaw.backend.service.FeedbackService;
import com.adptapaw.backend.utils.AdoptapawConstants;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins  = ("${site.base.url.https}"))
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


    @GetMapping("/all")
    public FeedbackListDTO getAllFeedbacks(@RequestParam(value = "pageNo", defaultValue = AdoptapawConstants.DEFAULT_PAGE_NUMBER, required = false) int pageNo,
                                              @RequestParam(value = "pageSize", defaultValue = AdoptapawConstants.DEFAULT_PAGE_SIZE, required = false) int pageSize,
                                              @RequestParam(value = "sortBy", defaultValue = AdoptapawConstants.DEFAULT_SORT_BY, required = false) String sortBy,
                                              @RequestParam(value = "sortDir", defaultValue = AdoptapawConstants.DEFAULT_SORT_DIRECTION, required = false) String sortDir){
        return feedbackService.getAllFeedbacks( pageNo,  pageSize, sortBy,sortDir);
    }
}
