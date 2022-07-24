package com.adptapaw.backend.controller;


import com.adptapaw.backend.payload.donations.DonationListDTO;
import com.adptapaw.backend.payload.donations.DonationDTO;
import com.adptapaw.backend.service.DonationService;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins  = "http://localhost:3000")
@RestController
@RequestMapping("/api")
public class DonationController {
    private final DonationService donationService;

    public DonationController(DonationService donationService) {
        this.donationService = donationService;
    }

    @PostMapping("/donationpost/{id}/user/{uid}/createdonation")
    public DonationDTO createDonation(@PathVariable(name="uid") String  uid, @PathVariable(name="id") String id, @RequestBody DonationDTO donationDTO){
        return donationService.createDonation(uid,id,donationDTO);
    }

    @GetMapping("/user/{uid}/donation/{id}")
    public DonationDTO getDonationById(@PathVariable(name = "uid") String uid, @PathVariable(name="id") String id){
        return donationService.getById(uid,id);
    }

    @GetMapping("/user/{id}/donation")
    public DonationListDTO getDonationByCreator(@PathVariable(name = "id") String id){
        return donationService.getAllByCreator(id);
    }
}
