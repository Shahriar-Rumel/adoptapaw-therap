package com.adptapaw.backend.security;

import com.adptapaw.backend.entity.Roles;
import com.adptapaw.backend.entity.User;
import com.adptapaw.backend.payload.UserDetailsDTO;
import com.adptapaw.backend.repository.UserRepository;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public  class UserServiceSecurity implements UserDetailsService {

    private final UserRepository userRepository;

    public UserServiceSecurity(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String usernameOrEmail) throws UsernameNotFoundException {
        User user = userRepository.findByUsernameOrEmail(usernameOrEmail,usernameOrEmail)
                .orElseThrow(() ->
                        new UsernameNotFoundException("User not found with username or email:" + usernameOrEmail));

        return new org.springframework.security.core.userdetails.User(user.getEmail(),
                user.getPassword(), mapRolesToAuthorities(user.getRoles()));

    }

    public UserDetailsDTO loadUserByEmail(String usernameOrEmail) throws UsernameNotFoundException {
        User user = userRepository.findByUsernameOrEmail(usernameOrEmail,usernameOrEmail)
                .orElseThrow(() ->
                        new UsernameNotFoundException("User not found with username or email:" + "okay"));

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


}