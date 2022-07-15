package com.adptapaw.backend.controller;


import com.adptapaw.backend.payload.missing.MissingAnimalDTO;
import com.adptapaw.backend.payload.missing.MissingAnimalResponseDTO;
import com.adptapaw.backend.service.MissingAnimalService;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins  = "http://localhost:3000")
@RestController
@RequestMapping("/api/missing")
public class MissingAnimalController {
    private final MissingAnimalService missingAnimalService;

    public MissingAnimalController(MissingAnimalService missingAnimalService) {
        this.missingAnimalService = missingAnimalService;
    }


    @PostMapping("/{id}/createmissingpost")
    public MissingAnimalDTO createMissingAnimalPost(@PathVariable(name="id") String  id, @RequestBody MissingAnimalDTO missingAnimalPostDTO){
        return missingAnimalService.createMissingAnimal(id, missingAnimalPostDTO);

    }


    @GetMapping("/all")
    public MissingAnimalResponseDTO getMissingAnimals(){
        return missingAnimalService.getAllMissingAnimals();
    }



    @GetMapping("/{id}")
    public MissingAnimalDTO getMissingAnimalById(@PathVariable(name = "id") String id){
        return missingAnimalService.getAllById(id);
    }

    @GetMapping("/user/{id}")
    public MissingAnimalResponseDTO getMissingAnimalByCreator(@PathVariable(name = "id") String id){
        return missingAnimalService.getAllByCreator(id);
    }
}
