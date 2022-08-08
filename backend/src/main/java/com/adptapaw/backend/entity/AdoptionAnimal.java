package com.adptapaw.backend.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;


import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
@ToString
@Entity

@Table(name = "adoptionanimal")
public class AdoptionAnimal {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String breed;

    @Column(nullable = false)
    private String training;

    @Column(nullable = false)
    private String vaccine;

    @Column(nullable = false)
    private String color;

    @Column(length = 1000)
    private String imageone;

    @Column(length = 1000)
    private String imagetwo;

    @Column(length = 1000)
    private String imagethree;

    @Column(nullable = false,length = 1000)
    private String description;

    @Column(nullable = false)
    private String physicalcondition;

    @Column(nullable = false)
    private String location;

    @Column(nullable = false)
    private String behaviour;

    @Column(nullable = false)
    private String food;

    @Column(nullable = false)
    private String gender;

    @Column(nullable = false)
    private String type;

    @Column(nullable = false)
    private String mobile;

    @Column(nullable = false)
    private String postedon;

    @Column(nullable = false)
    private Boolean availability;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "user_id",referencedColumnName = "id")
    private User user;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "owner_id",referencedColumnName = "id")
    private User owner;

    @JsonIgnore
    @OneToMany(mappedBy = "pet")
    private Set<AdoptionRequest> adoptionrequests = new HashSet<>();

}
