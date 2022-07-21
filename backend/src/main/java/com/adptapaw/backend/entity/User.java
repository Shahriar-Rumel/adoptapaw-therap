package com.adptapaw.backend.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.NonNull;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
@ToString
@Entity

@Table(name = "users" ,uniqueConstraints = {@UniqueConstraint(columnNames={"email"}),@UniqueConstraint(columnNames={"username"})})
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String username;

    @Column(nullable = false)
    private String email;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    private boolean accountVerified;

    @Column(nullable = false)
    private boolean banned;

    @Column()
    private String location;

    @Column(length = 1000)
    private String bio;

    @Column(length = 1000)
    private String dp;

    @ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinTable(name = "user_roles",
            joinColumns = @JoinColumn(name = "user_id", referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(name = "role_id", referencedColumnName = "id"))
    private Set<Roles> roles;

    @JsonIgnore
    @OneToMany(mappedBy = "user")
    private Set<AdoptionAnimal> animals = new HashSet<>();

    @JsonIgnore
    @OneToMany(mappedBy = "adoptionseeker")
    private Set<AdoptionRequest> adoptionrequests = new HashSet<>();

    @JsonIgnore
    @OneToMany(mappedBy = "owner")
    private Set<AdoptionAnimal> adoptedpets = new HashSet<>();


    @JsonIgnore
    @OneToMany(mappedBy = "usertoken")
    private Set<Token> tokens = new HashSet<>();



    @JsonIgnore
    @OneToMany(mappedBy = "creator")
    private Set<MissingAnimal> missinganimals = new HashSet<>();


    @JsonIgnore
    @OneToMany(mappedBy = "donationgiver")
    private Set<DonationGiver> donations = new HashSet<>();


}