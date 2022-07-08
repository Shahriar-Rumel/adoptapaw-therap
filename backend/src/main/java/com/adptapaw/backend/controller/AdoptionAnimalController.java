package com.adptapaw.backend.controller;

import com.adptapaw.backend.payload.adoption.AdoptionAnimalDTO;
import com.adptapaw.backend.payload.adoption.AdoptionAnimalResponseDTO;
import com.adptapaw.backend.service.AdoptionAnimalService;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins  = "http://localhost:3000")
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
    public AdoptionAnimalResponseDTO getAdoptionAnimals(){
        return adoptionAnimalService.getAllAdoptionAnimals();
    }


//    @GetMapping("/{id}")
//    public ResponseEntity<List<AdoptionAnimalDTO>> getAdoptionAnimalByCreator(@PathVariable(name = "id") String id){
//        return ResponseEntity.ok(adoptionAnimalService.getPostByCreator(Long.parseLong(id)));
//    }


    @GetMapping("/{id}")
    public AdoptionAnimalDTO getAdoptionAnimalById(@PathVariable(name = "id") String id){
        return adoptionAnimalService.getAllById(id);
    }

    @GetMapping("/user/{id}")
    public AdoptionAnimalResponseDTO getAdoptionAnimalByCreator(@PathVariable(name = "id") String id){
        return adoptionAnimalService.getAllByCreator(id);
    }


}
