package com.adptapaw.backend.service.implementation;

import com.adptapaw.backend.entity.*;
import com.adptapaw.backend.payload.StatsDTO;
import com.adptapaw.backend.repository.*;
import com.adptapaw.backend.service.StatsService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StatsServiceImplementation implements StatsService {

    private final UserRepository userRepository;
    private final AdoptionRequestRepository adoptionRequestRepository;
    private final MissingRequestRepository missingRequestRepository;
    private final AdoptionAnimalRepository adoptionAnimalRepository;
    private final MissingAnimalRepository missingAnimalRepository;
    private final DonationPostRepository donationPostRepository;

    public StatsServiceImplementation(UserRepository userRepository, AdoptionRequestRepository adoptionRequestRepository, MissingRequestRepository missingRequestRepository, AdoptionAnimalRepository adoptionAnimalRepository, MissingAnimalRepository missingAnimalRepository, DonationPostRepository donationPostRepository) {
        this.userRepository = userRepository;
        this.adoptionRequestRepository = adoptionRequestRepository;
        this.missingRequestRepository = missingRequestRepository;
        this.adoptionAnimalRepository = adoptionAnimalRepository;
        this.missingAnimalRepository = missingAnimalRepository;
        this.donationPostRepository = donationPostRepository;
    }

    @Override
    public ResponseEntity<?> getAllStats() {
        List<User> userList = userRepository.findAll();
        List<AdoptionAnimal> adoptionAnimalList = adoptionAnimalRepository.findAll();
        List<AdoptionRequest> adoptionRequestList = adoptionRequestRepository.findAll();
        List<MissingAnimal> missingAnimalList = missingAnimalRepository.findAll();
        List<MissingRequest> missingRequestList = missingRequestRepository.findAll();
        List<DonationPost>donationPostList = donationPostRepository.findAll();

        StatsDTO statsDTO = new StatsDTO();
        statsDTO.setUserSize((long) userList.size());
        statsDTO.setAdoptionAnimalSize((long) adoptionAnimalList.size());
        statsDTO.setAdoptionRequestSize((long) adoptionRequestList.size());
        statsDTO.setMissingPostSize((long) missingAnimalList.size());
        statsDTO.setMissingInformationSize((long) missingRequestList.size());
        statsDTO.setDonationSize((long) donationPostList.size());


        return new ResponseEntity<>(statsDTO, HttpStatus.OK);
    }
}
