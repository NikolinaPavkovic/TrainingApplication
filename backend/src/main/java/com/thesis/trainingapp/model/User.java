package com.thesis.trainingapp.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Collection;

@Entity
@Table(name = "users")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {
    @Id
    @Column(name = "id", nullable = false)
    @SequenceGenerator(name = "userSeqGen", sequenceName = "userSeqGen", initialValue = 1, allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "userSeqGen")
    private Long id;

    @Column(name="firstname", nullable=false)
    private String firstname;

    @Column(name="lastname", nullable=false)
    private String lastname;

    @Column(name="username", nullable=false)
    private String username;

    @Column(name="password", nullable=false)
    private String password;

    @ManyToMany(targetEntity = Role.class, fetch = FetchType.EAGER, cascade = {CascadeType.MERGE})
    private Collection<Role> roles = new ArrayList<>();
}
