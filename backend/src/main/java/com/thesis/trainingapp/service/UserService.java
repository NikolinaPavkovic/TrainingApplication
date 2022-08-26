package com.thesis.trainingapp.service;

import com.thesis.trainingapp.dto.NewPasswordDTO;
import com.thesis.trainingapp.dto.RegisterDTO;
import com.thesis.trainingapp.dto.UserDTO;
import com.thesis.trainingapp.dto.UsersWithMembershipDTO;
import com.thesis.trainingapp.model.Role;
import com.thesis.trainingapp.model.User;

import java.util.List;

public interface UserService {
    User saveUser(RegisterDTO user, String roleName);
    Role saveRole(Role role);
    void addRoleToUser(String username, String roleName);
    User getUser(String username);
    List<UserDTO> getUsers();
    User editUser(UserDTO dto, String currentUsername);
    User changePassword(NewPasswordDTO dto, String username);
    UserDTO getUserDTO(String username);
    User getById(Long id);
    List<UserDTO> searchUsers(String[] searchParams);
}
