package com.adptapaw.backend.controller;

import com.adptapaw.backend.payload.adoption.AdoptionRequestDTO;
import com.adptapaw.backend.payload.adoption.AdoptionRequestListDTO;
import com.adptapaw.backend.service.AdoptionRequestService;
import com.adptapaw.backend.utils.AdoptapawConstants;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;


@CrossOrigin(origins  = ("${site.base.url.https}"))
@RestController
@RequestMapping("/api")
public class AdoptionRequestController {

    private final AdoptionRequestService adoptionRequestService;

    public AdoptionRequestController(AdoptionRequestService adoptionRequestService) {
        this.adoptionRequestService = adoptionRequestService;
    }

    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    @PostMapping("/admin/{uid}/adoption/request/{id}/approve")
    public AdoptionRequestDTO approveAdoptionRequest(@PathVariable(name = "uid") String uid,@PathVariable(name = "id") String id){
        System.out.println("Rout hit");
        return adoptionRequestService.approveRequest(uid,id);
    }
    @PostMapping("/adoption/{id}/user/{uid}/createadoptionrequest")
    public ResponseEntity<?> createAdoptionRequestPost(@PathVariable(name="uid") String  uid, @PathVariable(name="id") String id, @RequestBody AdoptionRequestDTO adoptionRequestDTO){
        return adoptionRequestService.createAdoptionRequest(uid,id,adoptionRequestDTO);
    }

    @GetMapping("/user/{uid}/adoption/request/{id}")
    public AdoptionRequestDTO getAdoptionRequestById(@PathVariable(name = "uid") String uid,@PathVariable(name="id") String id){
        return adoptionRequestService.getById(uid,id);
    }

    @GetMapping("/user/{id}/adoption/request")
    public AdoptionRequestListDTO getAdoptionRequestsByCreator(@PathVariable(name = "id") String id){
        return adoptionRequestService.getAllByCreator(id);
    }



    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    @GetMapping("/admin/{id}/adoption/request/all")
    public AdoptionRequestListDTO getAllAdoptionRequest(@PathVariable(name = "id")String id,@RequestParam(value = "pageNo", defaultValue = AdoptapawConstants.DEFAULT_PAGE_NUMBER, required = false) int pageNo,
                                                 @RequestParam(value = "pageSize", defaultValue = AdoptapawConstants.DEFAULT_PAGE_SIZE, required = false) int pageSize,
                                                 @RequestParam(value = "sortBy", defaultValue = AdoptapawConstants.DEFAULT_SORT_BY, required = false) String sortBy,
                                                 @RequestParam(value = "sortDir", defaultValue = AdoptapawConstants.DEFAULT_SORT_DIRECTION, required = false) String sortDir){
        return adoptionRequestService.getAll(id,pageNo, pageSize, sortBy,sortDir);

    }
}