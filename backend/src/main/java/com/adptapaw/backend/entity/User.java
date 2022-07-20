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


    public void addAnimal(AdoptionAnimal newAdoptionAnimal){
        animals.add(newAdoptionAnimal);
    }

    public void setAnimals(Set<AdoptionAnimal> animals) {
        this.animals = animals;
    }

    public Set<AdoptionRequest> getAdoptionrequests() {
        return adoptionrequests;
    }

    public void setAdoptionrequests(Set<AdoptionRequest> adoptionrequests) {
        this.adoptionrequests = adoptionrequests;
    }

    public Set<AdoptionAnimal> getAdoptedpets() {
        return adoptedpets;
    }

    public void setAdoptedpets(Set<AdoptionAnimal> adoptedpets) {
        this.adoptedpets = adoptedpets;
    }

    public Set<MissingAnimal> getMissinganimals() {
        return missinganimals;
    }

    public void setMissinganimals(Set<MissingAnimal> missinganimals) {
        this.missinganimals = missinganimals;
    }

    public Set<DonationGiver> getDonations() {
        return donations;
    }

    public void setDonations(Set<DonationGiver> donations) {
        this.donations = donations;
    }

}