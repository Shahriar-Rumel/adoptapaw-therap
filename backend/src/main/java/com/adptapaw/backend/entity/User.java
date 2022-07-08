package com.adptapaw.backend.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.NonNull;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
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


//    @OneToMany(targetEntity = AdoptionAnimal.class,cascade = CascadeType.ALL,fetch = FetchType.LAZY)
//    @JoinColumn(name ="creator",referencedColumnName = "id")
//    @Column(nullable = false)
//    private List<AdoptionAnimal> animals = new ArrayList<>();




    @JsonIgnore
    @OneToMany(mappedBy = "user")
    private Set<AdoptionAnimal> animals = new HashSet<>();

    public void addAnimal(AdoptionAnimal newAdoptionAnimal){
        animals.add(newAdoptionAnimal);
    }

    public void setAnimals(Set<AdoptionAnimal> animals) {
        this.animals = animals;
    }
}