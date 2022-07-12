package com.adptapaw.backend.controller;

import com.adptapaw.backend.payload.adoption.AdoptionRequestDTO;
import com.adptapaw.backend.service.AdoptionRequestService;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins  = "http://localhost:3000")
@RestController
@RequestMapping("/api")
public class AdoptionRequestController {

    private final AdoptionRequestService adoptionRequestService;


    public AdoptionRequestController(AdoptionRequestService adoptionRequestService) {
        this.adoptionRequestService = adoptionRequestService;
    }


    @PostMapping("/user/{uid}/adoption/{id}/createadoptionrequest")
    public AdoptionRequestDTO createAdoptionAnimalPost(@PathVariable(name="uid") String  uid, @PathVariable(name="id") String id, @RequestBody AdoptionRequestDTO adoptionRequestDTO){
        return adoptionRequestService.createAdoptionRequest(uid,id,adoptionRequestDTO);
    }


//    @GetMapping("/all")
//    public AdoptionRequestDTO getAdoptionAnimals(){
//        return adoptionRequestService.getAllAdoptionRequests();
//    }



    @GetMapping("/{id}")
    public AdoptionRequestDTO getAdoptionAnimalById(@PathVariable(name = "id") String id){
        return adoptionRequestService.getAllById(id);
    }

    @GetMapping("/user/{id}")
    public AdoptionRequestDTO getAdoptionAnimalByCreator(@PathVariable(name = "id") String id){
        return adoptionRequestService.getAllByCreator(id);
    }
}