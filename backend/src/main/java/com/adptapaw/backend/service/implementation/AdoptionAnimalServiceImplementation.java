package com.adptapaw.backend.service.implementation;

import com.adptapaw.backend.entity.AdoptionAnimal;
import com.adptapaw.backend.payload.AdoptionAnimalDTO;
import com.adptapaw.backend.payload.AdoptionAnimalResponseDTO;
import com.adptapaw.backend.repository.AdoptionAnimalRepository;
import com.adptapaw.backend.service.AdoptionAnimalService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class AdoptionAnimalServiceImplementation implements AdoptionAnimalService {

    private ModelMapper mapper;

    private AdoptionAnimalRepository adoptionAnimalRepository;



    public AdoptionAnimalServiceImplementation(ModelMapper mapper, AdoptionAnimalRepository adoptionAnimalRepository) {
        this.mapper = mapper;
        this.adoptionAnimalRepository = adoptionAnimalRepository;
    }

    private AdoptionAnimalDTO mapToDTO(AdoptionAnimal adoptionAnimal){
        AdoptionAnimalDTO adoptionAnimalDTO = mapper.map(adoptionAnimal, AdoptionAnimalDTO.class);
        return adoptionAnimalDTO;
    }

    // convert DTO to entity
    private AdoptionAnimal mapToEntity(AdoptionAnimalDTO adoptionAnimalDTO){
        AdoptionAnimal adoptionAnimal = mapper.map(adoptionAnimalDTO, AdoptionAnimal.class);
        return adoptionAnimal;
    }

//    @Override
//    public AdoptionAnimalDTO getByCreator(Long creator) {
//        AdoptionAnimal adoptionAnimal = (AdoptionAnimal) AdoptionAnimalRepository.findByCreator(String.valueOf(creator));
////                .orElseThrow(() -> new ResourceNotFoundException("Adoption Animal", "id", creator));
//        return mapToDTO(adoptionAnimal);
//    }
//
//    @Override
//    public AdoptionAnimalResponseDTO getAllByCreator(Long creator) {
//        List<AdoptionAnimal> adoptionAnimal = AdoptionAnimalRepository.findAllByCreator(String.valueOf(creator));
////                .orElseThrow(() -> new ResourceNotFoundException("Adoption Animal", "id", creator));
////        return mapToDTO(adoptionAnimal);
//        List<AdoptionAnimalDTO> content= adoptionAnimal.stream().map(adoptionAnimalItem -> mapToDTO(adoptionAnimalItem)).collect(Collectors.toList());
//
////        Pageable pageable = PageRequest.of(pageNo, pageSize, sort);
////
////        Page<Post> posts = postRepository.findAll(pageable);
//
//        AdoptionAnimalResponseDTO adoptionAnimalResponse = new AdoptionAnimalResponseDTO();
//        adoptionAnimalResponse.setContent(content);
////        adoptionAnimalResponse.setPageNo(posts.getNumber());
////        adoptionAnimalResponse.setPageSize(posts.getSize());
////        adoptionAnimalResponse.setTotalElements(posts.getTotalElements());
////        adoptionAnimalResponse.setTotalPages(posts.getTotalPages());
////        adoptionAnimalResponse.setLast(posts.isLast());
//
//        return adoptionAnimalResponse;
//    }

    @Override
    public AdoptionAnimalResponseDTO getAllAdoptionAnimals() {
        List<AdoptionAnimal> adoptionAnimal = adoptionAnimalRepository.findAll();
//                .orElseThrow(() -> new ResourceNotFoundException("Adoption Animal", "id", creator));
//        return mapToDTO(adoptionAnimal);
        List<AdoptionAnimalDTO> content= adoptionAnimal.stream().map(adoptionAnimalItem -> mapToDTO(adoptionAnimalItem)).collect(Collectors.toList());


        AdoptionAnimalResponseDTO adoptionAnimalResponse = new AdoptionAnimalResponseDTO();
        adoptionAnimalResponse.setContent(content);


        return adoptionAnimalResponse;
    }


}
