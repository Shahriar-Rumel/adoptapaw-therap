package com.adptapaw.backend.service.implementation;


import com.adptapaw.backend.entity.DonationGiver;
import com.adptapaw.backend.entity.Donations;
import com.adptapaw.backend.entity.User;
import com.adptapaw.backend.payload.donations.DonationGivenListDTO;
import com.adptapaw.backend.payload.donations.DonationGiverDTO;
import com.adptapaw.backend.payload.donations.DonationUserDTO;
import com.adptapaw.backend.payload.donations.DonationsDTO;
import com.adptapaw.backend.repository.DonationGiverRepository;
import com.adptapaw.backend.repository.DonationsRepository;
import com.adptapaw.backend.repository.UserRepository;
import com.adptapaw.backend.service.DonationGiverService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
public class DonationGiverServiceImplementation implements DonationGiverService {
    private final ModelMapper mapper;
    private final DonationGiverRepository donationGiverRepository;

    private final DonationsRepository donationsRepository;
    @Autowired
    private UserRepository userRepository;

    public DonationGiverServiceImplementation(ModelMapper mapper, DonationGiverRepository donationGiverRepository, DonationsRepository donationsRepository) {
        this.mapper = mapper;
        this.donationGiverRepository = donationGiverRepository;
        this.donationsRepository = donationsRepository;
    }

    private DonationsDTO mapToDTO(Donations donations){
        return mapper.map(donations, DonationsDTO.class);
    }

    private DonationGiverDTO mapToRequestDTO(DonationGiver donationgiver){
        return mapper.map(donationgiver, DonationGiverDTO.class);
    }

    private DonationUserDTO mapTouserDTO(User user){
        return mapper.map(user, DonationUserDTO.class);
    }

    public DonationGiverDTO createDonationRequest(String uid,String id, DonationGiverDTO donationGiverDTO) {

        DonationGiver request = new DonationGiver();

        Date date = new Date();
        request.setDonationdate(String.valueOf(date));
        request.setAmountofmoney(Long.valueOf(donationGiverDTO.getAmountofmoney()));



        User user = (User)this.userRepository.findById(Long.valueOf(uid)).orElse(null);
        request.setDonationgiver(user);

        Donations donationpost = (Donations)this.donationsRepository.findById(Long.valueOf(id)).orElse(null);
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
        this.donationsRepository.save(donationpost);


        this.donationGiverRepository.save(request);

        DonationsDTO donationsDTO = mapToDTO(donationpost);

        DonationUserDTO donationUserDTO = mapTouserDTO(user);

        return mapToRequestDTO(request);
    }


    public DonationGivenListDTO getAllByCreator(String id) {

        User user  = userRepository.findById(Long.valueOf(id)).get();
        List<DonationGiver> donationGiver = donationGiverRepository.findAllByDonationgiver(user);

        List<DonationGiverDTO> content= donationGiver.stream().map(this::mapToRequestDTO).collect(Collectors.toList());
        DonationGivenListDTO donationGivenListDTO = new DonationGivenListDTO();
        donationGivenListDTO.setContent(content);
        return donationGivenListDTO;
    }

    @Override
    public DonationGiverDTO getById(String uid,String id) {
        DonationGiver donationGiver = donationGiverRepository.findById(Long.valueOf(id)).get();
        User user  = userRepository.findById(Long.valueOf(uid)).get();

        if(donationGiver.getDonationgiver() != user){
            return null;
        }
        return mapToRequestDTO(donationGiver);
    }
}
