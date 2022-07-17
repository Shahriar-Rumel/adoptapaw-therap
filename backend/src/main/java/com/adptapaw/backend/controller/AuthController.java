package com.adptapaw.backend.controller;

import com.adptapaw.backend.context.AccountVerificationEmailContext;
import com.adptapaw.backend.entity.Roles;
import com.adptapaw.backend.entity.Token;
import com.adptapaw.backend.entity.User;
import com.adptapaw.backend.exception.InvalidTokenException;
import com.adptapaw.backend.payload.JWTDTO;
import com.adptapaw.backend.payload.LoginDTO;
import com.adptapaw.backend.payload.SignupDTO;
import com.adptapaw.backend.payload.UserDetailsDTO;
import com.adptapaw.backend.repository.RolesRepository;
import com.adptapaw.backend.repository.UserRepository;
import com.adptapaw.backend.security.JWTTokenProvider;
import com.adptapaw.backend.security.UserServiceSecurity;
import com.adptapaw.backend.service.email.EmailService;
import com.adptapaw.backend.service.token.TokenService;
import com.cloudinary.utils.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.FileSystemResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.mail.MessagingException;
import java.io.File;
import java.util.Collections;

@CrossOrigin(origins  = "http://localhost:3000")
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private static final String REDIRECT_LOGIN = "Your Account has been verified visit localhost:3000/signin to login";
    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RolesRepository roleRepository;

    @Autowired
    private UserServiceSecurity userServiceSecurity;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JWTTokenProvider tokenProvider;

    @Autowired
    private EmailService emailService;

    @Autowired
    private TokenService tokenService;

    @Value("${site.base.url.https}")
    private String baseURL;

    @PostMapping("/signin")
    public ResponseEntity<?> authenticateUser(@RequestBody LoginDTO loginDTO){

            Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                    loginDTO.getEmail(), loginDTO.getPassword()));

            SecurityContextHolder.getContext().setAuthentication(authentication);

            String token = tokenProvider.generateToken(authentication);

            UserServiceSecurity userServiceSecurity = new UserServiceSecurity(userRepository, tokenService);

            UserDetailsDTO userDetailsDTO = userServiceSecurity.loadUserByEmail(loginDTO.getEmail());

            JWTDTO jwtdto = new JWTDTO(token);

            userDetailsDTO.setJwtdto(jwtdto);

            return new ResponseEntity<>(userDetailsDTO, HttpStatus.OK);

    }

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@RequestBody SignupDTO signupDTO)  {


            if( signupDTO.getName().isBlank())
                return new ResponseEntity<>("Name can not be empty",HttpStatus.BAD_REQUEST);

            if(signupDTO.getEmail().isBlank()  )
                return new ResponseEntity<>("Email can not be empty",HttpStatus.BAD_REQUEST);


            if( signupDTO.getUsername().isBlank())
                return new ResponseEntity<>("Username can not be empty",HttpStatus.BAD_REQUEST);


            if( signupDTO.getPassword().isBlank() )
                return new ResponseEntity<>("Password can not be empty",HttpStatus.BAD_REQUEST);


            if(userRepository.existsByEmail(signupDTO.getEmail()))
                return new ResponseEntity<>("Email is already taken!", HttpStatus.BAD_REQUEST);


            if(userRepository.existsByUsername(signupDTO.getUsername()))
                return new ResponseEntity<>("Username is already taken!", HttpStatus.BAD_REQUEST);


            // create user object
            User user = new User();
            user.setName(signupDTO.getName());
            user.setEmail(signupDTO.getEmail());
            user.setUsername(signupDTO.getUsername());
            user.setPassword(passwordEncoder.encode(signupDTO.getPassword()));

            Roles roles = roleRepository.findByName("ROLE_ADMIN").get();
            user.setRoles(Collections.singleton(roles));

            userRepository.save(user);

            Token token  = tokenService.createToken(user);

            AccountVerificationEmailContext mail = new AccountVerificationEmailContext();
            mail.setFrom("adoptapawofficial@gmail.com");
            mail.setTemplateLocation("emailsender.html");
            mail.setSubject("Complete your registration");
            mail.setTo(user.getEmail());
            mail.put("name",user.getName());
            mail.setToken(token.getToken());
            mail.buildVerificationUrl(baseURL,token.getToken());
            FileSystemResource imageResourceName = new FileSystemResource(new File("unsplash.com/photos/LvLlOpu3vzM"));
            mail.put("imageResourceName",imageResourceName);

            try{
                emailService.sendMail(mail);
            }catch (MessagingException e){
                e.printStackTrace();
            }
            

            return new ResponseEntity<>(user, HttpStatus.OK);


    }

    @GetMapping("/verify")
    public String verifyCustomer(@RequestParam(required = false) String token) throws InvalidTokenException {

        if(StringUtils.isEmpty(token)){

            return REDIRECT_LOGIN;
        }
        userServiceSecurity.verifyUser(token);

        return REDIRECT_LOGIN;
    }
}
