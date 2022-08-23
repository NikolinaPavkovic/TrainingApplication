package com.thesis.trainingapp.repository;

import com.thesis.trainingapp.model.Membership;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MembershipRepository extends JpaRepository<Membership, Long> {
    Optional<Membership> findById(Long id);
}
