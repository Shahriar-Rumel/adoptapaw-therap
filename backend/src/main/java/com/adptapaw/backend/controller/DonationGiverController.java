package com.adptapaw.backend.controller;


import com.adptapaw.backend.payload.donations.DonationGivenListDTO;
import com.adptapaw.backend.payload.donations.DonationGiverDTO;
import com.adptapaw.backend.service.DonationGiverService;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins  = "http://localhost:3000")
@RestController
@RequestMapping("/api")
public class DonationGiverController {
    private final DonationGiverService donationGiverService;

    public DonationGiverController(DonationGiverService donationGiverService) {
        this.donationGiverService = donationGiverService;
    }

    @PostMapping("/donation/{id}/user/{uid}/createdonation")
    public DonationGiverDTO createDonationGiverPost(@PathVariable(name="uid") String  uid, @PathVariable(name="id") String id, @RequestBody DonationGiverDTO donationGiverDTO){
        return donationGiverService.createDonationRequest(uid,id,donationGiverDTO);
    }

    @GetMapping("/user/{uid}/donation/request/{id}")
    public DonationGiverDTO getDonationGiverById(@PathVariable(name = "uid") String uid,@PathVariable(name="id") String id){
        return donationGiverService.getById(uid,id);
    }

    @GetMapping("/user/{id}/donation/request")
    public DonationGivenListDTO getDonationGiverByCreator(@PathVariable(name = "id") String id){
        return donationGiverService.getAllByCreator(id);
    }
}
