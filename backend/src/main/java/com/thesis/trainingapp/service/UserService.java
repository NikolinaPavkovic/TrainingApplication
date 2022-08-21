package com.thesis.trainingapp.service;

import com.thesis.trainingapp.model.Role;
import com.thesis.trainingapp.model.User;

import java.util.List;

public interface UserService {
    User saveUser(User user);
    Role saveRole(Role role);
    void addRoleToUser(String username, String roleName);
    User getUser(String username);
    List<User> getUsers();
}
