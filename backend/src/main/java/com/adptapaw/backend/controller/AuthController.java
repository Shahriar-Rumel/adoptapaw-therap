package com.adptapaw.backend.controller;

import com.adptapaw.backend.entity.Roles;
import com.adptapaw.backend.entity.User;
import com.adptapaw.backend.payload.JWTDTO;
import com.adptapaw.backend.payload.LoginDTO;
import com.adptapaw.backend.payload.SignupDTO;
import com.adptapaw.backend.payload.UserDetailsDTO;
import com.adptapaw.backend.repository.RolesRepository;
import com.adptapaw.backend.repository.UserRepository;
import com.adptapaw.backend.security.JWTTokenProvider;
import com.adptapaw.backend.security.UserServiceSecurity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;

@CrossOrigin(origins  = "http://localhost:3000")
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RolesRepository roleRepository;


    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JWTTokenProvider tokenProvider;

    @PostMapping("/signin")
    public UserDetailsDTO authenticateUser(@RequestBody LoginDTO loginDTO){
        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                loginDTO.getEmail(), loginDTO.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);

        String token = tokenProvider.generateToken(authentication);

        UserServiceSecurity userServiceSecurity = new UserServiceSecurity(userRepository);

        UserDetailsDTO userDetailsDTO = userServiceSecurity.loadUserByEmail(loginDTO.getEmail());

        JWTDTO jwtdto = new JWTDTO(token);

        userDetailsDTO.setJwtdto(jwtdto);

        return userDetailsDTO;
    }

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@RequestBody SignupDTO signupDTO){

        // add check for username exists in a DB
        if(userRepository.existsByEmail(signupDTO.getEmail())){
            return new ResponseEntity<>("Email is already taken!", HttpStatus.BAD_REQUEST);
        }

        if(userRepository.existsByUsername(signupDTO.getUsername())){
            return new ResponseEntity<>("Username is already taken!", HttpStatus.BAD_REQUEST);
        }

        // create user object
        User user = new User();
        user.setName(signupDTO.getName());
        user.setEmail(signupDTO.getEmail());
        user.setUsername(signupDTO.getUsername());
        user.setPassword(passwordEncoder.encode(signupDTO.getPassword()));

        Roles roles = roleRepository.findByName("ROLE_ADMIN").get();
        user.setRoles(Collections.singleton(roles));

        userRepository.save(user);

        return new ResponseEntity<>(user, HttpStatus.OK);

    }
}
