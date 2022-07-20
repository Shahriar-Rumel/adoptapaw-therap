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

@Table(name = "missinganimal")
public class MissingAnimal {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String breed;


    @Column(nullable = false)
    private String vaccine;

    @Column(nullable = false)
    private String color;

    //    @Lob
    @Column(nullable = false,length = 1000)
    private String datemissing;

    @Column(length = 1000)
    private String image;

    @Column(nullable = false,length = 1000)
    private String specificattribute;

    @Column(nullable = false)
    private String location;

    @Column(nullable = false,length = 1000)
    private String accessorieslastworn;

    @Column(nullable = false,length = 1000)
    private String rewards;

    @Column(nullable = false)
    private String gender;

    @Column(nullable = false)
    private String type;

    @Column(nullable = false)
    private Boolean stillmissing;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "user_id",referencedColumnName = "id")
    private User creator;

    @JsonIgnore
    @OneToMany(mappedBy = "pet")
    private Set<MissingRequest> missingrequests = new HashSet<>();

}