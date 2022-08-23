package com.thesis.trainingapp.service;

import com.thesis.trainingapp.dto.MembershipDTO;
import com.thesis.trainingapp.model.Membership;

import java.util.List;

public interface MembershipService {
    Membership saveMembreship(MembershipDTO membership);
    List<Membership> getMemberships();
}
