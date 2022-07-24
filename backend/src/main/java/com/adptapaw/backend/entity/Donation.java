package com.adptapaw.backend.entity;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;

@Getter
@Setter
@ToString
@Entity
@Table(name = "donation")
public class Donation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false)
    private Long id;

    @Column(nullable = false)
    private String donationdate;

    @Column(nullable = false)
    private Long amountofmoney;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "donator_id",referencedColumnName = "id")
    private User donator;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "donationpost_id",referencedColumnName = "id")
    private DonationPost donationpost;

}
