package com.thesis.trainingapp.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Table(name = "roles")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Role {
    @Id
    @Column(name = "id", nullable = false)
    @SequenceGenerator(name = "roleSeqGen", sequenceName = "roleSeqGen", initialValue = 1, allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "roleSeqGen")
    private Long id;

    @Column(name="name", nullable=false)
    private String name;
}
