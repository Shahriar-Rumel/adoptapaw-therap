package com.adptapaw.backend.controller;



import com.adptapaw.backend.payload.donations.DonationPostDTO;
import com.adptapaw.backend.payload.donations.DonationPostResponseDTO;
import com.adptapaw.backend.service.DonationPostService;
import com.adptapaw.backend.utils.AdoptapawConstants;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins  = ("${site.base.url.https}"))
@RestController
@RequestMapping("/api/donationpost")
public class DonationPostController {
    private final DonationPostService donationPostService;

    public DonationPostController(DonationPostService donationPostService) {
        this.donationPostService = donationPostService;
    }


    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    @PostMapping("/createdonationspost")
    public DonationPostDTO createDonationPost(@RequestBody DonationPostDTO donationPostDTO){
        return donationPostService.createDonationsPost(donationPostDTO);

    }


    @GetMapping("/all")
    public DonationPostResponseDTO getDonationPosts(@RequestParam(value = "pageNo", defaultValue = AdoptapawConstants.DEFAULT_PAGE_NUMBER, required = false) int pageNo,
                                                    @RequestParam(value = "pageSize", defaultValue = AdoptapawConstants.DEFAULT_PAGE_SIZE, required = false) int pageSize,
                                                    @RequestParam(value = "sortBy", defaultValue = AdoptapawConstants.DEFAULT_SORT_BY, required = false) String sortBy,
                                                    @RequestParam(value = "sortDir", defaultValue = AdoptapawConstants.DEFAULT_SORT_DIRECTION, required = false) String sortDir){
        return donationPostService.getAllDonationsPosts(pageNo,  pageSize, sortBy,sortDir);
    }


//    @GetMapping("/{id}")
//    public ResponseEntity<List<AdoptionAnimalDTO>> getAdoptionAnimalByCreator(@PathVariable(name = "id") String id){
//        return ResponseEntity.ok(adoptionAnimalService.getPostByCreator(Long.parseLong(id)));
//    }


    @GetMapping("/{id}")
    public DonationPostDTO getDonationPostById(@PathVariable(name = "id") String id){
        return donationPostService.getAllById(id);
    }
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    @PostMapping("/{id}")
    public DonationPostDTO UpdateDonationPost(@PathVariable (name="id") String  id, @RequestBody DonationPostDTO donationPostDTO){
        return donationPostService.updateById(id,donationPostDTO);
    }

    @DeleteMapping("/{id}")
    public String DeleteDonationPost(@PathVariable (name="id") String  id){
        return donationPostService.DeleteById(id);
    }

}
