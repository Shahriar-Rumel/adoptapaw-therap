package com.adptapaw.backend.service.implementation;


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
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class DonationServiceImplementation implements DonationService {
    private final ModelMapper mapper;
    private final DonationRepository donationRepository;

    private final DonationPostRepository donationPostRepository;
    @Autowired
    private UserRepository userRepository;

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

        DonationPostDTO donationPostDTO = mapToDTO(donationpost);

        DonationUserDTO donationUserDTO = mapTouserDTO(user);

        return mapToRequestDTO(request);
    }


    public DonationListDTO getAllByCreator(String id) {

        User user  = userRepository.findById(Long.valueOf(id)).get();
        List<Donation> donation = donationRepository.findAllByDonator(user);

        List<DonationDTO> content= donation.stream().map(this::mapToRequestDTO).collect(Collectors.toList());
        DonationListDTO donationListDTO = new DonationListDTO();
        donationListDTO.setContent(content);
        return donationListDTO;
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
