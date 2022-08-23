package com.thesis.trainingapp.service;

import com.thesis.trainingapp.dto.UserMembershipDTO;
import com.thesis.trainingapp.model.UserMembership;

import java.util.List;

public interface UserMembershipService {
    List<UserMembership> getMemberships();
    UserMembership save(UserMembershipDTO userMembershipDTO);
}
