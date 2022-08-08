package com.adptapaw.backend.controller;




import com.adptapaw.backend.payload.missing.MissingRequestDTO;
import com.adptapaw.backend.payload.missing.MissingRequestListDTO;
import com.adptapaw.backend.service.MissingRequestService;
import com.adptapaw.backend.utils.AdoptapawConstants;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins  = ("${site.base.url.https}"))
@RestController
@RequestMapping("/api")
public class MissingRequestController {
    private final MissingRequestService missingRequestService;

    public MissingRequestController(MissingRequestService missingRequestService) {
        this.missingRequestService = missingRequestService;
    }

    @PostMapping("/missing/{id}/create")
    public MissingRequestDTO createMissingRequestPost( @PathVariable(name="id") String id, @RequestBody MissingRequestDTO missingRequestDTO){
        return missingRequestService.createMissingRequest(id,missingRequestDTO);
    }

    @GetMapping("/missing/request/{id}")
    public MissingRequestDTO getMissingRequestById(@PathVariable(name="id") String id){
        return missingRequestService.getById(id);
    }

    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    @GetMapping("/admin/{id}/missing/request/all")
    public MissingRequestListDTO getAllMissingRequest(@PathVariable(name = "id")String id, @RequestParam(value = "pageNo", defaultValue = AdoptapawConstants.DEFAULT_PAGE_NUMBER, required = false) int pageNo,
                                                      @RequestParam(value = "pageSize", defaultValue = AdoptapawConstants.DEFAULT_PAGE_SIZE, required = false) int pageSize,
                                                      @RequestParam(value = "sortBy", defaultValue = AdoptapawConstants.DEFAULT_SORT_BY, required = false) String sortBy,
                                                      @RequestParam(value = "sortDir", defaultValue = AdoptapawConstants.DEFAULT_SORT_DIRECTION, required = false) String sortDir){
        return missingRequestService.getAll(id,pageNo, pageSize, sortBy,sortDir);

    }
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    @PostMapping("/admin/{uid}/missing/request/{id}/approve")
    public MissingRequestDTO approveMissingInfo(@PathVariable(name = "uid") String uid, @PathVariable(name = "id") String id){
        return missingRequestService.approveInfo(uid,id);
    }
}
