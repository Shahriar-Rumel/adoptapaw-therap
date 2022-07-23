package com.adptapaw.backend.controller;



import com.adptapaw.backend.payload.donations.DonationsDTO;
import com.adptapaw.backend.payload.donations.DonationsResponseDTO;
import com.adptapaw.backend.service.DonationsService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins  = "http://localhost:3000")
@RestController
@RequestMapping("/api/donations")
public class DonationsController {
    private final DonationsService donationsService;

    public DonationsController(DonationsService donationsService) {
        this.donationsService = donationsService;
    }


    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    @PostMapping("/createdonationspost")
    public DonationsDTO createDonationsPost(@RequestBody DonationsDTO donationsPostDTO){
        return donationsService.createDonationsPost(donationsPostDTO);

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
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    @PostMapping("/{id}")
    public DonationsDTO UpdateDonations(@PathVariable (name="id") String  id, @RequestBody DonationsDTO donationsDTO){
        return donationsService.updateById(id,donationsDTO);
    }

    @DeleteMapping("/{id}")
    public String DeleteAdoptionAnimal(@PathVariable (name="id") String  id){
        return donationsService.DeleteById(id);
    }

}
