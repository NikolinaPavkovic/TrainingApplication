package com.thesis.trainingapp.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Collection;

@Entity
@Table(name = "memberships")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Membership {
    @Id
    @Column(name = "id", nullable = false)
    @SequenceGenerator(name = "membershipSeqGen", sequenceName = "membershipSeqGen", initialValue = 1, allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "membershipSeqGen")
    private Long id;

    @Column(name="name", nullable=false)
    private String name;

    @Column(name="price", nullable=false)
    private Integer price;

    @Column(name="durationInDays", nullable = false)
    private Integer durationInDays;

    @ManyToMany(targetEntity = Benefit.class, fetch = FetchType.EAGER, cascade = {CascadeType.MERGE})
    private Collection<Benefit> benefits;
}
