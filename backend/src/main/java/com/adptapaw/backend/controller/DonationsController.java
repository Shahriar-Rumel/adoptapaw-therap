package com.adptapaw.backend.controller;


import com.adptapaw.backend.payload.donations.DonationsDTO;
import com.adptapaw.backend.payload.donations.DonationsResponseDTO;
import com.adptapaw.backend.service.DonationsService;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins  = "http://localhost:3000")
@RestController
@RequestMapping("/api/donations")
public class DonationsController {
    private final DonationsService donationsService;

    public DonationsController(DonationsService donationsService) {
        this.donationsService = donationsService;
    }


    @PostMapping("/{id}/createdonationspost")
    public DonationsDTO createDonationsPost(@PathVariable(name="id") String  id, @RequestBody DonationsDTO donationsPostDTO){
        return donationsService.createDonationsPost(id,donationsPostDTO);

    }


    @GetMapping("/all")
    public DonationsResponseDTO getDonations(){
        return donationsService.getAllDonationsPosts();
    }


//    @GetMapping("/{id}")
//    public ResponseEntity<List<AdoptionAnimalDTO>> getAdoptionAnimalByCreator(@PathVariable(name = "id") String id){
//        return ResponseEntity.ok(adoptionAnimalService.getPostByCreator(Long.parseLong(id)));
//    }


    @GetMapping("/{id}")
    public DonationsDTO geDonationsById(@PathVariable(name = "id") String id){
        return donationsService.getAllById(id);
    }


}
