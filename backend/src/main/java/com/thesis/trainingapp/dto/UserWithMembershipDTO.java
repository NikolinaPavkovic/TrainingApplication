package com.thesis.trainingapp.dto;

import com.thesis.trainingapp.model.User;
import com.thesis.trainingapp.model.UserMembership;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserWithMembershipDTO {
    private UserDTO user;
    private UserMembership membership;
}
