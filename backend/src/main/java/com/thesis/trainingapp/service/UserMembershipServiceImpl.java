package com.thesis.trainingapp.service;

import com.thesis.trainingapp.dto.UserMembershipDTO;
import com.thesis.trainingapp.model.Membership;
import com.thesis.trainingapp.model.User;
import com.thesis.trainingapp.model.UserMembership;
import com.thesis.trainingapp.repository.UserMembershipRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Calendar;
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
       if(checkIfHasMembership(user.getUsername())) return null;
       return userMembershipRepository.save(new UserMembership(null, new Date(), user, membership, setEndDate(membership.getDurationInDays()), false));
    }

    private Date setEndDate(Integer days) {
        Calendar c = Calendar.getInstance();
        c.setTime(new Date());
        c.add(Calendar.DATE, days);
        return c.getTime();
    }

    private boolean checkIfHasMembership(String username) {
        UserMembership userMembership = get(username);
        if(userMembership != null) {
            return true;
        }
        return false;
    }

    @Override
    public UserMembership get(String username) {
        List<UserMembership> userMemberships = userMembershipRepository.getUnexpiredUserMembershipsByUserUsername(username);
        return setExpiredMembershipsAndGetValidMembership(userMemberships);
    }

    @Override
    public void deleteUserMembershipsByMembershipId(Long memId) {
        List<UserMembership> memberships = userMembershipRepository.findAll();
        for (UserMembership membership : memberships) {
            if(membership.getMembership().getId() == memId)
                userMembershipRepository.deleteById(membership.getId());
        }
    }

    private UserMembership setExpiredMembershipsAndGetValidMembership(List<UserMembership> memberships) {
        UserMembership validMembership = null;
        for (UserMembership membership : memberships) {
            if (membership.getEndDate().before(new Date())) {
                membership.setExpired(true);
                userMembershipRepository.save(membership);
            } else validMembership = membership;
        }
        return validMembership;
    }
}
