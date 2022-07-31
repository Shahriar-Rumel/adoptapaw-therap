package com.adptapaw.backend.security;

import com.adptapaw.backend.context.AccountPasswordResetEmailContext;
import com.adptapaw.backend.entity.AdoptionAnimal;
import com.adptapaw.backend.entity.Roles;
import com.adptapaw.backend.entity.Token;
import com.adptapaw.backend.entity.User;
import com.adptapaw.backend.exception.InvalidTokenException;
import com.adptapaw.backend.payload.AllUserResponseDTO;
import com.adptapaw.backend.payload.LoginDTO;
import com.adptapaw.backend.payload.UserDetailsDTO;
import com.adptapaw.backend.payload.adoption.AdoptionAnimalDTO;
import com.adptapaw.backend.payload.adoption.AdoptionAnimalResponseDTO;
import com.adptapaw.backend.repository.UserRepository;
import com.adptapaw.backend.service.email.EmailService;
import com.adptapaw.backend.service.token.TokenService;
import org.apache.catalina.mapper.Mapper;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import java.util.*;
import java.util.stream.Collectors;


@Service
public  class UserServiceSecurity implements UserDetailsService {

    private final UserRepository userRepository;

    private final TokenService tokenService;


    @Value("${site.base.url.https}")
    private String baseURL;



    private static final String REDIRECT_LOGIN = "Your Account has been verified visit localhost:3000/signin to login";

    @Autowired
    private EmailService emailService;

    public UserServiceSecurity(UserRepository userRepository, TokenService tokenService) {
        this.userRepository = userRepository;
        this.tokenService = tokenService;
    }

    @Override
    public UserDetails loadUserByUsername(String usernameOrEmail) throws UsernameNotFoundException {

        User user = userRepository.findByUsernameOrEmail(usernameOrEmail,usernameOrEmail)
                .orElseThrow(() ->
                        new UsernameNotFoundException("User not found with username or email:" + usernameOrEmail));

        if(user.isAccountVerified() && !user.isBanned()){


            return new org.springframework.security.core.userdetails.User(user.getEmail(),
                    user.getPassword(), user.isAccountVerified(),true,true,true,mapRolesToAuthorities(user.getRoles()));

        }

        return null;
    }

    public UserDetailsDTO loadUserByEmail(String usernameOrEmail) throws UsernameNotFoundException {
        User user = userRepository.findByUsernameOrEmail(usernameOrEmail,usernameOrEmail)
                .orElseThrow(() ->
                        new UsernameNotFoundException("User not found with username or email:" + "okay"));

        if(!user.isAccountVerified()){
            new ResponseEntity<>("You have to verify First", HttpStatus.OK);
        }

        UserDetailsDTO userDetails = new UserDetailsDTO();
        userDetails.setUsername(user.getUsername());
        userDetails.setRole(user.getRoles());
        userDetails.setName(user.getName());
        userDetails.setEmail(user.getEmail());
        userDetails.setId(user.getId());
        userDetails.setDp(user.getDp());
        userDetails.setLocation(user.getLocation());
        userDetails.setBio(user.getBio());

        return userDetails;

    }

    private Collection< ? extends GrantedAuthority> mapRolesToAuthorities(Set<Roles> roles){

        return roles.stream().map(role -> new SimpleGrantedAuthority(role.getName())).collect(Collectors.toList());
    }

    public boolean verifyUser(String token) throws InvalidTokenException {

        Token usertoken = tokenService.findByToken(token);
        if (Objects.isNull(usertoken) || !StringUtils.equals(token, usertoken.getToken()) || usertoken.isExpired()) {
            throw new InvalidTokenException("Token is not valid");
        }
        User user = userRepository.findById(usertoken.getUsertoken().getId()).get();
        if (Objects.isNull(user)) {
            return false;
        }
        user.setAccountVerified(true);
        userRepository.save(user);

        tokenService.removeToken(usertoken);
        return true;
    }

    public String CreateForgotPasswordToken(String email) {
        try {

            User user = userRepository.findByEmail(email).get();
            Token token  = tokenService.createToken(user);

            AccountPasswordResetEmailContext mail = new AccountPasswordResetEmailContext();
            mail.setFrom("adoptapawofficial@gmail.com");
            mail.setTemplateLocation("passwordreset.html");
            mail.setSubject("Reset your password");
            mail.setTo(user.getEmail());
            mail.put("name",user.getName());
            mail.setToken(token.getToken());
            mail.buildVerificationUrl(baseURL,token.getToken());

            try{
                emailService.sendMail(mail);
            }catch (MessagingException e){
                e.printStackTrace();
            }

            return REDIRECT_LOGIN;

        } catch (UsernameNotFoundException e) {
            return "No user found";
        }

    }


    public ResponseEntity<?> getAllUsers(int pageNo,  int pageSize, String sortBy,String sortDir) {

        Sort sort = sortDir.equalsIgnoreCase(Sort.Direction.ASC.name()) ? Sort.by(sortBy).ascending()
                : Sort.by(sortBy).descending();

        Pageable pageable = PageRequest.of(pageNo, pageSize, sort);
        Page<User> userList =  userRepository.findAll(pageable);
        List<User> userListContent = userList.getContent();
        List<UserDetailsDTO> userListDTO = userListContent.stream().map(user -> {
            UserDetailsDTO userDetailsDTO = new UserDetailsDTO();
            userDetailsDTO.setId(user.getId());
            userDetailsDTO.setDp(user.getDp());
            userDetailsDTO.setEmail(user.getEmail());
            userDetailsDTO.setUsername(user.getUsername());
            userDetailsDTO.setName(user.getName());
            userDetailsDTO.setLocation(user.getLocation());
            return userDetailsDTO;
        }).collect(Collectors.toList());

        AllUserResponseDTO allUserResponseDTO = new AllUserResponseDTO();
        allUserResponseDTO.setContent(userListDTO);
        allUserResponseDTO.setPageNo(userList.getNumber());
        allUserResponseDTO.setPageSize(userList.getSize());
        allUserResponseDTO.setTotalElements(userList.getTotalElements());
        allUserResponseDTO.setTotalPages(userList.getTotalPages());
        allUserResponseDTO.setLast(userList.isLast());


        return new ResponseEntity<>(allUserResponseDTO,HttpStatus.OK);
    }
}