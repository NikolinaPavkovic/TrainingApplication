package com.thesis.trainingapp.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Date;
import java.util.Optional;

@Entity
@Table(name = "user_memberships")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserMembership {
    @Id
    @Column(name = "id", nullable = false)
    @SequenceGenerator(name = "userMemSeqGen", sequenceName = "userMemSeqGen", initialValue = 1, allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "userMemSeqGen")
    private Long id;

    @Column(name = "start_date")
    private Date startDate;

    @OneToOne(targetEntity = User.class, fetch = FetchType.EAGER, cascade = CascadeType.MERGE)
    private User user;

    @OneToOne(targetEntity = Membership.class, fetch = FetchType.EAGER, cascade = CascadeType.MERGE)
    private Membership membership;

    @Column(name = "end_date")
    private Date endDate;

    @Column(name = "is_expired")
    private boolean isExpired;
}
