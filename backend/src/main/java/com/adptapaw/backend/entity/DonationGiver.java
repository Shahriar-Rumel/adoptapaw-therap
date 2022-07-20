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
@Table(name = "donationgiver")
public class DonationGiver {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false)
    private Long id;

    @Column(nullable = false)
    private String donationdate;

    @Column(nullable = false)
    private Long amountofmoney;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "donationgiver_id",referencedColumnName = "id")
    private User donationgiver;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "donationpost_id",referencedColumnName = "id")
    private Donations donationpost;

}
