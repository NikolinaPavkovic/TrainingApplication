package com.thesis.trainingapp.repository;

import com.thesis.trainingapp.model.UserMembership;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface UserMembershipRepository extends JpaRepository<UserMembership, Long> {
    @Query("SELECT userMem FROM UserMembership userMem WHERE userMem.user.username = ?1 AND userMem.isExpired = false")
    List<UserMembership> getUnexpiredUserMembershipsByUserUsername(String username);
}
