package com.adptapaw.backend.entity;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;


import javax.persistence.*;

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

//    @Lob
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

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "user_id",referencedColumnName = "id")
    private User user;

}