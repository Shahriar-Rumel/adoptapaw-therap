package com.adptapaw.backend.controller;


import com.adptapaw.backend.payload.donations.DonationListDTO;
import com.adptapaw.backend.payload.donations.DonationDTO;
import com.adptapaw.backend.service.DonationService;
import com.adptapaw.backend.utils.AdoptapawConstants;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins  = ("${site.base.url.https}"))
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
    public ResponseEntity<?> getDonationByCreator(@PathVariable(name = "id")String id, @RequestParam(value = "pageNo", defaultValue = AdoptapawConstants.DEFAULT_PAGE_NUMBER, required = false) int pageNo,
                                                        @RequestParam(value = "pageSize", defaultValue = AdoptapawConstants.DEFAULT_PAGE_SIZE, required = false) int pageSize,
                                                        @RequestParam(value = "sortBy", defaultValue = AdoptapawConstants.DEFAULT_SORT_BY, required = false) String sortBy,
                                                        @RequestParam(value = "sortDir", defaultValue = AdoptapawConstants.DEFAULT_SORT_DIRECTION, required = false) String sortDir ){
        return donationService.getAllByCreator(id,pageNo, pageSize, sortBy,sortDir);
    }
}
