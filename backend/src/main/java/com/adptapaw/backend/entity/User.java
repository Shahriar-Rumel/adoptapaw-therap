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
    private String name;

    @NonNull
    private String username;
    private String email;
    private String password;

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
    private Set<AdoptionRequests> adoptionrequests = new HashSet<>();

    @JsonIgnore
    @OneToMany(mappedBy = "owner")
    private Set<AdoptionAnimal> adoptedpets = new HashSet<>();


    public void addAnimal(AdoptionAnimal newAdoptionAnimal){
        animals.add(newAdoptionAnimal);
    }

    public void setAnimals(Set<AdoptionAnimal> animals) {
        this.animals = animals;
    }

    public Set<AdoptionRequests> getAdoptionrequests() {
        return adoptionrequests;
    }

    public void setAdoptionrequests(Set<AdoptionRequests> adoptionrequests) {
        this.adoptionrequests = adoptionrequests;
    }

    public Set<AdoptionAnimal> getAdoptedpets() {
        return adoptedpets;
    }

    public void setAdoptedpets(Set<AdoptionAnimal> adoptedpets) {
        this.adoptedpets = adoptedpets;
    }

}