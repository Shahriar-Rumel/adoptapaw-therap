package com.adptapaw.backend.entity;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;

@Getter
@Setter
@ToString
@Entity

@Table(name = "adoptionrequests")
public class AdoptionRequest {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false)
    private Long id;

    @Column(nullable = false)
    private String requestdate;

    @Column(nullable = false)
    private String approveddate;

    @Column(nullable = false)
    private Boolean status;

    @Column(nullable = false,length = 1000)
    private String rfa;

    @Column(nullable = false)
    private Boolean hadpet;

    @Column(nullable = false)
    private Boolean pickup;

    @Column(nullable = false)
    private String mobile;

    @Column(nullable = false)
    private String email;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "adoptionseeker_id",referencedColumnName = "id")
    private User adoptionseeker;


    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "pet_id",referencedColumnName = "id")
    private AdoptionAnimal pet;

}
