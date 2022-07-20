package com.adptapaw.backend.entity;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;

@Getter
@Setter
@ToString
@Entity
@Table(name = "feedbackpage")
public class FeedbackPage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false)
    private Long id;

    @Column(nullable = false)
    private Long rating;

    @Column(nullable = false)
    private String description;
    @Column(nullable = false)
    private String feedbackdate;
}
