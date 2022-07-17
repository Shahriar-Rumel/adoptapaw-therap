package com.adptapaw.backend.security;

import com.adptapaw.backend.entity.Roles;
import com.adptapaw.backend.entity.Token;
import com.adptapaw.backend.entity.User;
import com.adptapaw.backend.exception.InvalidTokenException;
import com.adptapaw.backend.payload.UserDetailsDTO;
import com.adptapaw.backend.repository.UserRepository;
import com.adptapaw.backend.service.token.TokenService;
import org.apache.commons.lang3.StringUtils;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.Objects;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public  class UserServiceSecurity implements UserDetailsService {

    private final UserRepository userRepository;

    private final TokenService tokenService;

    public UserServiceSecurity(UserRepository userRepository, TokenService tokenService) {
        this.userRepository = userRepository;
        this.tokenService = tokenService;
    }

    @Override
    public UserDetails loadUserByUsername(String usernameOrEmail) throws UsernameNotFoundException {
        User user = userRepository.findByUsernameOrEmail(usernameOrEmail,usernameOrEmail)
                .orElseThrow(() ->
                        new UsernameNotFoundException("User not found with username or email:" + usernameOrEmail));

        if(user != null && user.isAccountVerified()){
            return new org.springframework.security.core.userdetails.User(user.getEmail(),
                    user.getPassword(), mapRolesToAuthorities(user.getRoles()));
        }else{
            throw  new UsernameNotFoundException("User doesn't exist");
        }

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
}