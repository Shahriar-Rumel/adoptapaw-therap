package com.adptapaw.backend.controller;



import com.adptapaw.backend.payload.missing.MissingAnimalDTO;
import com.adptapaw.backend.payload.missing.MissingAnimalResponseDTO;
import com.adptapaw.backend.service.MissingAnimalService;
import com.adptapaw.backend.utils.AdoptapawConstants;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins  = ("${site.base.url.https}"))
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
    public MissingAnimalResponseDTO getMissingAnimals(@RequestParam(value = "pageNo", defaultValue = AdoptapawConstants.DEFAULT_PAGE_NUMBER, required = false) int pageNo,
                                                      @RequestParam(value = "pageSize", defaultValue = AdoptapawConstants.DEFAULT_PAGE_SIZE, required = false) int pageSize,
                                                      @RequestParam(value = "sortBy", defaultValue = AdoptapawConstants.DEFAULT_SORT_BY, required = false) String sortBy,
                                                      @RequestParam(value = "sortDir", defaultValue = AdoptapawConstants.DEFAULT_SORT_DIRECTION, required = false) String sortDir){
        return missingAnimalService.getAllMissingAnimals( pageNo,  pageSize, sortBy,sortDir);
    }



    @GetMapping("/{id}")
    public MissingAnimalDTO getMissingAnimalById(@PathVariable(name = "id") String id){
        return missingAnimalService.getAllById(id);
    }

    @GetMapping("/user/{id}")
    public ResponseEntity<?> getMissingAnimalByCreator(@PathVariable(name = "id")String id, @RequestParam(value = "pageNo", defaultValue = AdoptapawConstants.DEFAULT_PAGE_NUMBER, required = false) int pageNo,
                                                        @RequestParam(value = "pageSize", defaultValue = AdoptapawConstants.DEFAULT_PAGE_SIZE, required = false) int pageSize,
                                                        @RequestParam(value = "sortBy", defaultValue = AdoptapawConstants.DEFAULT_SORT_BY, required = false) String sortBy,
                                                        @RequestParam(value = "sortDir", defaultValue = AdoptapawConstants.DEFAULT_SORT_DIRECTION, required = false) String sortDir ){
        return missingAnimalService.getAllByCreator(id,pageNo, pageSize, sortBy,sortDir);
    }

    @PutMapping("/{id}")
    public MissingAnimalDTO UpdateMissingAnimal(@PathVariable (name="id") String  id, @RequestBody MissingAnimalDTO missingAnimalPostDTO){
        return missingAnimalService.updateById(id,missingAnimalPostDTO);
    }

    @DeleteMapping("/{id}")
    public String DeleteMissingAnimal(@PathVariable (name="id") String  id){
        return missingAnimalService.DeleteById(id);
    }
}
