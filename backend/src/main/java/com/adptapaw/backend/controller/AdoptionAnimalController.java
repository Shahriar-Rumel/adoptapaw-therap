package com.adptapaw.backend.controller;

import com.adptapaw.backend.payload.adoption.AdoptionAnimalDTO;
import com.adptapaw.backend.payload.adoption.AdoptionAnimalResponseDTO;
import com.adptapaw.backend.payload.donations.DonationPostDTO;
import com.adptapaw.backend.service.AdoptionAnimalService;
import com.adptapaw.backend.utils.AdoptapawConstants;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins  = ("${site.base.url.https}"))
@RestController
@RequestMapping("/api/adoption")
public class AdoptionAnimalController {

    private final AdoptionAnimalService adoptionAnimalService;

    public AdoptionAnimalController(AdoptionAnimalService adoptionAnimalService) {
        this.adoptionAnimalService = adoptionAnimalService;
    }


    @PostMapping("/{id}/createadoptionpost")
    public AdoptionAnimalDTO createAdoptionAnimalPost(@PathVariable (name="id") String  id, @RequestBody AdoptionAnimalDTO adoptionAnimalPostDTO){
        return adoptionAnimalService.createAdoptionAnimal(id,adoptionAnimalPostDTO);

    }


    @GetMapping("/all")
    public AdoptionAnimalResponseDTO getAdoptionAnimals(@RequestParam(value = "pageNo", defaultValue = AdoptapawConstants.DEFAULT_PAGE_NUMBER, required = false) int pageNo,
                                                        @RequestParam(value = "pageSize", defaultValue = AdoptapawConstants.DEFAULT_PAGE_SIZE, required = false) int pageSize,
                                                        @RequestParam(value = "sortBy", defaultValue = AdoptapawConstants.DEFAULT_SORT_BY, required = false) String sortBy,
                                                        @RequestParam(value = "sortDir", defaultValue = AdoptapawConstants.DEFAULT_SORT_DIRECTION, required = false) String sortDir){
        return adoptionAnimalService.getAllAdoptionAnimals( pageNo,  pageSize, sortBy,sortDir);
    }




    @GetMapping("/{id}")
    public AdoptionAnimalDTO getAdoptionAnimalById(@PathVariable(name = "id") String id){
        return adoptionAnimalService.getAllById(id);
    }

    @GetMapping("/user/{id}")
    public ResponseEntity<?> getAdoptionAnimalByCreator(@PathVariable(name = "id")String id,@RequestParam(value = "pageNo", defaultValue = AdoptapawConstants.DEFAULT_PAGE_NUMBER, required = false) int pageNo,
            @RequestParam(value = "pageSize", defaultValue = AdoptapawConstants.DEFAULT_PAGE_SIZE, required = false) int pageSize,
            @RequestParam(value = "sortBy", defaultValue = AdoptapawConstants.DEFAULT_SORT_BY, required = false) String sortBy,
            @RequestParam(value = "sortDir", defaultValue = AdoptapawConstants.DEFAULT_SORT_DIRECTION, required = false) String sortDir ){
        return adoptionAnimalService.getAllByCreator(id,pageNo, pageSize, sortBy,sortDir);
    }

    @PostMapping("/{id}")
    public ResponseEntity<?> UpdateAdoptionAnimal(@PathVariable (name="id") String  id, @RequestBody AdoptionAnimalDTO adoptionAnimalPostDTO){
        return adoptionAnimalService.updateById(id,adoptionAnimalPostDTO);
    }

    @DeleteMapping("/{id}")
    public String DeleteAdoptionAnimal(@PathVariable (name="id") String  id){
        return adoptionAnimalService.DeleteById(id);
    }

}
