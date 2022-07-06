package com.adptapaw.backend.controller;

import com.adptapaw.backend.payload.AdoptionAnimalResponseDTO;
import com.adptapaw.backend.service.AdoptionAnimalService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/api/adoption")
public class AdoptionAnimalController {


    private AdoptionAnimalService adoptionAnimalService;

    public AdoptionAnimalController(AdoptionAnimalService adoptionAnimalService) {
        this.adoptionAnimalService = adoptionAnimalService;
    }

    @GetMapping("/all")

    public AdoptionAnimalResponseDTO getAdoptionAnimals(){
        return adoptionAnimalService.getAllAdoptionAnimals();
    }
//    @GetMapping("/{id}")
//    public ResponseEntity<AdoptionAnimalDTO> getAdoptonAnimalByCreator(@PathVariable(name = "creator") long id){
//        return ResponseEntity.ok(adoptionAnimalService.getByCreator(id));
//    }
}
