package com.thesis.trainingapp.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Table(name = "benefits")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Benefit {
    @Id
    @Column(name = "id", nullable = false)
    @SequenceGenerator(name = "benefitSeqGen", sequenceName = "benefitSeqGen", initialValue = 1, allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "benefitSeqGen")
    private Long id;

    @Column(name="name", nullable=false)
    private String name;
}
