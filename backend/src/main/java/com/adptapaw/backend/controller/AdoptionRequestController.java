package com.adptapaw.backend.controller;

import com.adptapaw.backend.payload.adoption.AdoptionRequestDTO;
import com.adptapaw.backend.payload.adoption.AdoptionRequestListDTO;
import com.adptapaw.backend.service.AdoptionRequestService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins  = "http://localhost:3000")
@RestController
@RequestMapping("/api")
public class AdoptionRequestController {

    private final AdoptionRequestService adoptionRequestService;

    public AdoptionRequestController(AdoptionRequestService adoptionRequestService) {
        this.adoptionRequestService = adoptionRequestService;
    }

    @PostMapping("/adoption/{id}/user/{uid}/createadoptionrequest")
    public AdoptionRequestDTO createAdoptionRequestPost(@PathVariable(name="uid") String  uid, @PathVariable(name="id") String id, @RequestBody AdoptionRequestDTO adoptionRequestDTO){
        return adoptionRequestService.createAdoptionRequest(uid,id,adoptionRequestDTO);
    }

    @GetMapping("/user/{uid}/adoption/request/{id}")
    public AdoptionRequestDTO getAdoptionRequestById(@PathVariable(name = "uid") String uid,@PathVariable(name="id") String id){
        return adoptionRequestService.getById(uid,id);
    }

    @GetMapping("/user/{id}/adoption/request")
    public AdoptionRequestListDTO getAdoptionRequestsByCreator(@PathVariable(name = "id") String id){
        return adoptionRequestService.getAllByCreator(id);
    }
}