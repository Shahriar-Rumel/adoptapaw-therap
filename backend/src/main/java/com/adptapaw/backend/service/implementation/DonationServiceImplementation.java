package com.adptapaw.backend.service.implementation;


import com.adptapaw.backend.context.GeneralPurposeEmailContext;
import com.adptapaw.backend.entity.Donation;
import com.adptapaw.backend.entity.DonationPost;
import com.adptapaw.backend.entity.User;

import com.adptapaw.backend.payload.donations.DonationListDTO;
import com.adptapaw.backend.payload.donations.DonationDTO;
import com.adptapaw.backend.payload.donations.DonationUserDTO;
import com.adptapaw.backend.payload.donations.DonationPostDTO;
import com.adptapaw.backend.repository.DonationRepository;
import com.adptapaw.backend.repository.DonationPostRepository;
import com.adptapaw.backend.repository.UserRepository;
import com.adptapaw.backend.service.DonationService;
import com.adptapaw.backend.service.email.EmailService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import java.util.Date;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
public class DonationServiceImplementation implements DonationService {
    private final ModelMapper mapper;
    private final DonationRepository donationRepository;

    private final DonationPostRepository donationPostRepository;
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private EmailService emailService;

    public DonationServiceImplementation(ModelMapper mapper, DonationRepository donationRepository, DonationPostRepository donationPostRepository) {
        this.mapper = mapper;
        this.donationRepository = donationRepository;
        this.donationPostRepository = donationPostRepository;
    }

    private DonationPostDTO mapToDTO(DonationPost donationPost){
        return mapper.map(donationPost, DonationPostDTO.class);
    }



    private DonationDTO mapToRequestDTO(Donation donation){
        return mapper.map(donation, DonationDTO.class);
    }

    private DonationUserDTO mapTouserDTO(User user){
        return mapper.map(user, DonationUserDTO.class);
    }

    public DonationDTO createDonation(String uid, String id, DonationDTO donationDTO) {

        Donation request = new Donation();

        Date date = new Date();
        request.setDonationdate(String.valueOf(date));
        request.setAmountofmoney(Long.valueOf(donationDTO.getAmountofmoney()));



        User user = (User)this.userRepository.findById(Long.valueOf(uid)).orElse(null);
        request.setDonator(user);

        DonationPost donationpost = (DonationPost)this.donationPostRepository.findById(Long.valueOf(id)).orElse(null);
        request.setDonationpost(donationpost);

//        assert user != null;
//        assert donationpost != null;
//        if(Objects.equals(donationpost.getUser().getEmail(), user.getEmail())){
//            System.out.println("Can't donate");
//            return null;
//        }
        Long remainingamount = donationpost.getRemainingamount();
        Long peopledonated = donationpost.getPeopledonated();


        remainingamount = remainingamount - request.getAmountofmoney();
        peopledonated = peopledonated + 1;
        donationpost.setRemainingamount(remainingamount);
        donationpost.setPeopledonated(peopledonated);
        this.donationPostRepository.save(donationpost);


        this.donationRepository.save(request);

        GeneralPurposeEmailContext mail = new GeneralPurposeEmailContext();
        mail.setFrom("adoptapawofficial@gmail.com");
        mail.setTemplateLocation("donation.html");
        mail.setSubject("Acknowledgement of donation.");
        mail.setTo(user.getEmail());
        mail.put("name",user.getName());
        mail.put("pet",request.getDonationpost().getName());
        mail.put("amount",request.getAmountofmoney()+" BDT");

        try{
            emailService.sendMail(mail);

        }catch (MessagingException e){
            e.printStackTrace();
        }

        DonationPostDTO donationPostDTO = mapToDTO(donationpost);

        DonationUserDTO donationUserDTO = mapTouserDTO(user);

        return mapToRequestDTO(request);
    }


    public ResponseEntity<?> getAllByCreator(String id, int pageNo,  int pageSize, String sortBy,String sortDir) {

        User user  = userRepository.findById(Long.valueOf(id)).get();

        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if(!Objects.equals(user.getEmail(), auth.getName())){
            return new ResponseEntity<>("Not authorized to make changes", HttpStatus.BAD_REQUEST);
        }

        Sort sort = sortDir.equalsIgnoreCase(Sort.Direction.ASC.name()) ? Sort.by(sortBy).ascending()
                : Sort.by(sortBy).descending();

        Pageable pageable = PageRequest.of(pageNo, pageSize, sort);
        Page<Donation> donationmade =  donationRepository.findAllByDonator(user,pageable);
        List<Donation> donation = donationmade.getContent();
        List<DonationDTO> content= donation.stream().map(donationItem ->mapToRequestDTO(donationItem)).collect(Collectors.toList());

        DonationListDTO  donationList = new DonationListDTO();
        donationList.setContent(content);
        donationList.setPageNo(donationmade.getNumber());
        donationList.setPageSize(donationmade.getSize());
        donationList.setTotalElements(donationmade.getTotalElements());
        donationList.setTotalPages(donationmade.getTotalPages());
        donationList.setLast(donationmade.isLast());

        return new ResponseEntity<>(donationList,HttpStatus.OK);
    }

    @Override
    public DonationDTO getById(String uid, String id) {
        Donation donation = donationRepository.findById(Long.valueOf(id)).get();
        User user  = userRepository.findById(Long.valueOf(uid)).get();

        if(donation.getDonator() != user){
            return null;
        }
        return mapToRequestDTO(donation);
    }
}
