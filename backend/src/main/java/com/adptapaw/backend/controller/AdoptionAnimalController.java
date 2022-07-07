package com.adptapaw.backend.controller;

import com.adptapaw.backend.entity.User;
import com.adptapaw.backend.payload.AdoptionAnimalAllDTO;
import com.adptapaw.backend.payload.AdoptionAnimalDTO;
import com.adptapaw.backend.payload.AdoptionAnimalResponseDTO;
import com.adptapaw.backend.repository.AdoptionAnimalRepository;
import com.adptapaw.backend.repository.UserRepository;
import com.adptapaw.backend.service.AdoptionAnimalService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/adoption")
public class AdoptionAnimalController {

    private AdoptionAnimalService adoptionAnimalService;

    @Autowired
    private AdoptionAnimalRepository adoptionAnimalRepository;



    public AdoptionAnimalController(AdoptionAnimalService adoptionAnimalService) {
        this.adoptionAnimalService = adoptionAnimalService;
    }


    @PutMapping("/{id}/createadoptionpost")
    public AdoptionAnimalDTO createAdoptionAnimalPost(@PathVariable (name="id") String  id, @RequestBody AdoptionAnimalDTO adoptionAnimalPostDTO){


        return adoptionAnimalService.createAdoptionAnimal(id,adoptionAnimalPostDTO);

    }


    @GetMapping("/all")
    public AdoptionAnimalResponseDTO getAdoptionAnimals(){
        return adoptionAnimalService.getAllAdoptionAnimals();
    }


//    @GetMapping("/{id}")
//    public ResponseEntity<List<AdoptionAnimalDTO>> getAdoptionAnimalByCreator(@PathVariable(name = "id") String id){
//        return ResponseEntity.ok(adoptionAnimalService.getPostByCreator(Long.parseLong(id)));
//    }

    @GetMapping("/{id}")
    public AdoptionAnimalResponseDTO getAdoptionAnimalByCreator(@PathVariable(name = "id") String id){
        return adoptionAnimalService.getAllByCreator(id);
    }
}
