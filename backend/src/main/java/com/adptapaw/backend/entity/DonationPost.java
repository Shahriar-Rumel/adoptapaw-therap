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

@Table(name = "donationposts")
public class DonationPost {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String type;

    @Column(nullable = false)
    private String description;

    @Column(nullable = false)
    private Long targetamount;

    @Column(nullable = false)
    private Long remainingamount;

    @Column(nullable = false)
    private Long peopledonated;

    @Column(length = 1000)
    private String image;

    @Column(nullable = false)
    private String location;

    @Column(nullable = false)
    private String creationtime;

    @JsonIgnore
    @OneToMany(mappedBy = "donationpost")
    private Set<Donation> donator = new HashSet<>();
}
