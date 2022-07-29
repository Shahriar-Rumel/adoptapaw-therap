package com.adptapaw.backend.controller;


import com.adptapaw.backend.payload.missing.MissingRequestDTO;
import com.adptapaw.backend.service.MissingRequestService;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins  = "http://localhost:3000")
@RestController
@RequestMapping("/api/missing")
public class MissingRequestController {
    private final MissingRequestService missingRequestService;

    public MissingRequestController(MissingRequestService missingRequestService) {
        this.missingRequestService = missingRequestService;
    }

    @PostMapping("/{id}/create")
    public MissingRequestDTO createMissingRequestPost( @PathVariable(name="id") String id, @RequestBody MissingRequestDTO missingRequestDTO){
        return missingRequestService.createMissingRequest(id,missingRequestDTO);
    }

    @GetMapping("/request/{id}")
    public MissingRequestDTO getMissingRequestById(@PathVariable(name="id") String id){
        return missingRequestService.getById(id);
    }

}
