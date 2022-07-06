package com.adptapaw.backend.entity;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;

@Getter
@Setter
@ToString
@Entity

@Table(name = "adoptionAnimal")
public class AdoptionAnimal {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String breed;
    private String training;
    private String vaccine;
    private String color;
    private String description;
    private String physicalcondition;
    private String location;
    private String behaviour;
    private String food;
    private String gender;
    private Long creator;
}
