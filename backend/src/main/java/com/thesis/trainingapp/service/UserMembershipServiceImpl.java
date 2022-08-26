package com.thesis.trainingapp.service;

import com.thesis.trainingapp.dto.UserMembershipDTO;
import com.thesis.trainingapp.model.Membership;
import com.thesis.trainingapp.model.User;
import com.thesis.trainingapp.model.UserMembership;
import com.thesis.trainingapp.repository.MembershipRepository;
import com.thesis.trainingapp.repository.UserMembershipRepository;
import com.thesis.trainingapp.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Date;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class UserMembershipServiceImpl implements UserMembershipService{
    private final UserMembershipRepository userMembershipRepository;
    private final MembershipService membershipService;
    private final UserService userService;

    @Override
    public List<UserMembership> getMemberships() {
        return userMembershipRepository.findAll();
    }

    @Override
    public UserMembership save(UserMembershipDTO userMembershipDTO) {
       User user = userService.getById(userMembershipDTO.getUserId());
       Membership membership = membershipService.getById(userMembershipDTO.getMembershipId());
       return userMembershipRepository.save(new UserMembership(null, new Date(), user, membership));
    }

    @Override
    public UserMembership get(String username) {
        System.out.println(userMembershipRepository.getUserMembershipsByUserUsername(username));
        return userMembershipRepository.getUserMembershipsByUserUsername(username);
    }
}
