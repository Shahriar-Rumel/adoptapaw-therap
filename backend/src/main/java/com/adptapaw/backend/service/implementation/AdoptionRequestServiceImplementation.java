package com.adptapaw.backend.service.implementation;

import com.adptapaw.backend.context.AccountPasswordResetEmailContext;
import com.adptapaw.backend.context.GeneralPurposeEmailContext;
import com.adptapaw.backend.entity.AdoptionAnimal;
import com.adptapaw.backend.entity.AdoptionRequest;
import com.adptapaw.backend.entity.Roles;
import com.adptapaw.backend.entity.User;
import com.adptapaw.backend.payload.adoption.*;
import com.adptapaw.backend.repository.AdoptionAnimalRepository;
import com.adptapaw.backend.repository.AdoptionRequestRepository;
import com.adptapaw.backend.repository.UserRepository;
import com.adptapaw.backend.service.AdoptionRequestService;
import com.adptapaw.backend.service.email.EmailService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class AdoptionRequestServiceImplementation implements AdoptionRequestService {
    private final ModelMapper mapper;
    private final AdoptionRequestRepository adoptionRequestRepository;

    private final AdoptionAnimalRepository adoptionAnimalRepository;

    private String currentRole ;
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private EmailService emailService;

    public AdoptionRequestServiceImplementation(ModelMapper mapper, AdoptionRequestRepository adoptionRequestRepository,AdoptionAnimalRepository adoptionAnimalRepository) {
        this.mapper = mapper;
        this.adoptionRequestRepository = adoptionRequestRepository;
        this.adoptionAnimalRepository = adoptionAnimalRepository;
    }

    private AdoptionAnimalDTO mapToDTO(AdoptionAnimal adoptionAnimal){
        return mapper.map(adoptionAnimal, AdoptionAnimalDTO.class);
    }

    private AdoptionRequestDTO mapToRequestDTO(AdoptionRequest adoptionRequest){
        return mapper.map(adoptionRequest, AdoptionRequestDTO.class);
    }

    private AdoptionUserDTO mapTouserDTO(User user){
        return mapper.map(user, AdoptionUserDTO.class);
    }

    public ResponseEntity<?> createAdoptionRequest(String uid,String id, AdoptionRequestDTO adoptionRequestDTO) {

        AdoptionRequest request = new AdoptionRequest();
        request.setStatus(false);
        Date date = new Date();
        request.setRequestdate(String.valueOf(date));
        request.setApproveddate(" ");
        request.setEmail(adoptionRequestDTO.getEmail());
        request.setRfa(adoptionRequestDTO.getRfa());
        request.setMobile(adoptionRequestDTO.getMobile());
        request.setPickup(adoptionRequestDTO.getPickup());
        request.setHadpet(adoptionRequestDTO.getHadpet());

        User user = (User)this.userRepository.findById(Long.valueOf(uid)).orElse(null);
        request.setAdoptionseeker(user);

        AdoptionAnimal pet = (AdoptionAnimal)this.adoptionAnimalRepository.findById(Long.valueOf(id)).orElse(null);
        request.setPet(pet);

        assert user != null;
        assert pet != null;
        if(Objects.equals(pet.getUser().getEmail(), user.getEmail())){
            return new ResponseEntity<>("You can't adopt your own animal", HttpStatus.BAD_REQUEST);
        }
        this.adoptionRequestRepository.save(request);

        AccountPasswordResetEmailContext mail = new AccountPasswordResetEmailContext();
        mail.setFrom("adoptapawofficial@gmail.com");
        mail.setTemplateLocation("adoptionrequest.html");
        mail.setSubject("Your adoption request has been placed successfully!");
        mail.setTo(request.getEmail());
        mail.put("name",user.getName());
        mail.put("pet",pet.getName());

        try{
            emailService.sendMail(mail);
        }catch (MessagingException e){
            e.printStackTrace();
        }

        AdoptionAnimalDTO adoptionAnimalDTO = mapToDTO(pet);

        AdoptionUserDTO adoptionUserDTO = mapTouserDTO(user);

        return new ResponseEntity<>(mapToRequestDTO(request), HttpStatus.OK);
    }


    public AdoptionRequestListDTO getAllByCreator(String id) {

        User user  = userRepository.findById(Long.valueOf(id)).get();
        List<AdoptionRequest> adoptionRequests = adoptionRequestRepository.findAllByAdoptionseeker(user);

        List<AdoptionRequestDTO> content= adoptionRequests.stream().map(this::mapToRequestDTO).collect(Collectors.toList());
        AdoptionRequestListDTO adoptionRequestListDTO = new AdoptionRequestListDTO();
        adoptionRequestListDTO.setContent(content);
        return adoptionRequestListDTO;
    }

    @Override
    public AdoptionRequestDTO getById(String uid,String id) {
        AdoptionRequest adoptionRequest = adoptionRequestRepository.findById(Long.valueOf(id)).get();
        User user  = userRepository.findById(Long.valueOf(uid)).get();

        if(adoptionRequest.getAdoptionseeker() != user){
            return null;
        }
        return mapToRequestDTO(adoptionRequest);
    }

    @Override
    public AdoptionRequestDTO approveRequest(String uid,String id) {

        AdoptionRequest adoptionRequest = adoptionRequestRepository.findById(Long.valueOf(id)).get();
        AdoptionAnimal animal  = adoptionAnimalRepository.findById(adoptionRequest.getPet().getId()).get();

         try{
             User user = userRepository.findById(Long.valueOf(uid)).get();


                for (Roles authority : user.getRoles()) {
                    currentRole = authority.getName();
                }

                if(currentRole.equals("ROLE_ADMIN")){

                     Date date = new Date();
                     adoptionRequest.setStatus(true);
                     adoptionRequest.setApproveddate(String.valueOf(date));
                     adoptionRequestRepository.save(adoptionRequest);

                     animal.setAvailability(false);
                     animal.setOwner(adoptionRequest.getAdoptionseeker());
                     adoptionAnimalRepository.save(animal);

                    AccountPasswordResetEmailContext mail = new AccountPasswordResetEmailContext();
                    mail.setFrom("adoptapawofficial@gmail.com");
                    mail.setTemplateLocation("adoptionapproved.html");
                    mail.setSubject("Congratulations! Your adoption request has been approved.");
                    mail.setTo(adoptionRequest.getEmail());
                    mail.put("name",animal.getOwner().getName());
                    mail.put("pet",animal.getName());
                    mail.put("owner",animal.getUser().getName());
                    mail.put("mobile",animal.getMobile());
                    mail.put("email",animal.getUser().getEmail());

                    try{
                        emailService.sendMail(mail);


                    }catch (MessagingException e){
                        e.printStackTrace();
                    }

                    GeneralPurposeEmailContext mailToOwner = new GeneralPurposeEmailContext();
                    mailToOwner.setFrom("adoptapawofficial@gmail.com");
                    mailToOwner.setTemplateLocation("adoptionapprovedowner.html");
                    mailToOwner.setSubject("We’ve found a suitable person to adopt your pet.");
                    mailToOwner.setTo(animal.getUser().getEmail());
                    mailToOwner.put("name",animal.getUser().getName());
                    mailToOwner.put("pet",animal.getName());
                    mailToOwner.put("seeker",animal.getOwner().getName());
                    mailToOwner.put("mobile",adoptionRequest.getMobile());
                    mailToOwner.put("email",adoptionRequest.getEmail());

                    try{
                        emailService.sendMail(mailToOwner);

                    }catch (MessagingException e){
                        e.printStackTrace();
                    }

                     return mapToRequestDTO(adoptionRequest);
                }



         }catch (UsernameNotFoundException e){
             return null;
         }

         return null;

    }

    @Override
    public AdoptionRequestListDTO getAll(String id, int pageNo, int pageSize, String sortBy, String sortDir) {

        Sort sort = sortDir.equalsIgnoreCase(Sort.Direction.ASC.name()) ? Sort.by(sortBy).ascending()
                : Sort.by(sortBy).descending();

        Pageable pageable = PageRequest.of(pageNo, pageSize, sort);

        Page<AdoptionRequest> requests = adoptionRequestRepository.findAll(pageable);

        List<AdoptionRequest> adoptionRequests = requests.getContent();

        List<AdoptionRequestDTO> content= adoptionRequests.stream().map(adoptionRequestsItem -> mapToRequestDTO(adoptionRequestsItem)).collect(Collectors.toList());


        AdoptionRequestListDTO adoptionRequestListDTO = new AdoptionRequestListDTO();
        adoptionRequestListDTO.setContent(content);
        adoptionRequestListDTO.setPageNo(requests.getNumber());
        adoptionRequestListDTO.setPageSize(requests.getSize());
        adoptionRequestListDTO.setTotalElements(requests.getTotalElements());
        adoptionRequestListDTO.setTotalPages(requests.getTotalPages());
        adoptionRequestListDTO.setLast(requests.isLast());

        return adoptionRequestListDTO;
    }


}

