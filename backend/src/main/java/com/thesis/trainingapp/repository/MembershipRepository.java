package com.thesis.trainingapp.repository;

import com.thesis.trainingapp.model.Membership;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MembershipRepository extends JpaRepository<Membership, Long> {
}
