package com.adptapaw.backend.controller;

import com.adptapaw.backend.service.AdoptionRequestService;
import com.adptapaw.backend.service.StatsService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins  = ("${site.base.url.https}"))
@RestController
@RequestMapping("/api/admin")
public class StatsController {

    private final StatsService statsService;

    public StatsController(StatsService statsService) {
        this.statsService = statsService;
    }

    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    @GetMapping("/stats")
    public ResponseEntity<?> getOverAllStats(){
        return statsService.getAllStats();
    }

}
