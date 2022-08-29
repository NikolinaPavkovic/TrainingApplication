package com.thesis.trainingapp.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;

import java.util.Collection;
import java.util.Date;

@Entity
@Table(name = "trainings")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Training {
    @Id
    @Column(name = "id", nullable = false)
    @SequenceGenerator(name = "trainingSeqGen", sequenceName = "trainingSeqGen", initialValue = 1, allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "trainingSeqGen")
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "start_date")
    private Date startDate;
    @Column(name = "duration")
    private Integer duration;

    @ManyToOne(targetEntity = User.class, fetch = FetchType.EAGER, cascade = CascadeType.MERGE)
    private User trainer;

    @Column(name = "capacity")
    private Integer capacity;

    @Column(name = "description")
    private String description;

    @ManyToMany(targetEntity = User.class, fetch = FetchType.EAGER, cascade = {CascadeType.MERGE})
    private Collection<User> reservations = new ArrayList<>();
}
