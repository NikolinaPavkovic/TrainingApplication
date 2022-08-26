package com.thesis.trainingapp.repository;

import com.thesis.trainingapp.model.UserMembership;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserMembershipRepository extends JpaRepository<UserMembership, Long> {
    UserMembership getUserMembershipsByUserUsername(String username);
}
