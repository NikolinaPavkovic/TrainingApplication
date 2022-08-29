package com.thesis.trainingapp.service;

import com.thesis.trainingapp.dto.*;
import com.thesis.trainingapp.exception.UserNotFoundException;
import com.thesis.trainingapp.model.Role;
import com.thesis.trainingapp.model.User;
import com.thesis.trainingapp.repository.RoleRepository;
import com.thesis.trainingapp.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.awt.desktop.OpenFilesEvent;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class UserServiceImpl implements UserService, UserDetailsService {
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final ModelMapper modelMapper = new ModelMapper();

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByUsername(username);
        if(user == null){
            log.error("User not found in the database");
            throw new UsernameNotFoundException("User not found in the database");
        } else {
            log.info("User found in the database: {}", username);
        }
        Collection<SimpleGrantedAuthority> authorities = new ArrayList<>();
        user.getRoles().forEach(role -> {
            authorities.add(new SimpleGrantedAuthority(role.getName()));
        });
        return new org.springframework.security.core.userdetails.User(user.getUsername(), user.getPassword(), authorities);
    }

    @Override
    public User saveUser(RegisterDTO userDTO, String role) {
        //add validation and error handling
        if(usernameExists(userDTO.getUsername())) return null;
        log.info("Saving new user: {} to database", userDTO.getUsername());
        User user = prepareForSave(userDTO, role);
        return userRepository.save(user);
    }

    private User prepareForSave(RegisterDTO dto, String roleName) {
        User user = modelMapper.map(dto, User.class);
        if(roleName == "ROLE_TRAINER") {
            user.setPassword(passwordEncoder.encode(dto.getFirstname().toLowerCase() + "123"));
        } else {
            user.setPassword(passwordEncoder.encode(dto.getPassword()));
        }
        Role role = roleRepository.findByName(roleName);
        user.getRoles().add(role);
        return user;
    }

    private boolean usernameExists(String username) {
        User u = userRepository.findByUsername(username);
        if (u == null) return false;
        return true;
    }

    @Override
    public Role saveRole(Role role) {
        if(roleExists(role.getName())) return null;
        log.info("Saving new role: {} to database", role.getName());
        return roleRepository.save(role);
    }

    private boolean roleExists(String name) {
        Role r = roleRepository.findByName(name);
        if(r == null) return false;
        return true;
    }

    @Override
    public void addRoleToUser(String username, String roleName) {
        log.info("Adding role: {} to user: {}", roleName, username);
        User user = userRepository.findByUsername(username);
        Role role = roleRepository.findByName(roleName);
        user.getRoles().add(role); //we don't have to save explicitly to database because of @Transactional annotation
    }

    @Override
    public User getUser(String username) {
        log.info("Fetching user: {} from database", username);
        return userRepository.findByUsername(username);
    }

    @Override
    public List<UserDTO> getUsers() {
        log.info("Fetching all users");
        List<User> allUsers = userRepository.findAll();
        List<UserDTO> dtos = new ArrayList<>();
        for (User u : allUsers) {
            dtos.add(getUserDTO(u.getUsername()));
        }
        dtos.remove(0);
        return dtos;
    }

    @Override
    public User editUser(EditProfileDTO dto, String currentUsername) {
        User user = userRepository.findByUsername(currentUsername);
        user.setFirstname(dto.getFirstname());
        user.setLastname(dto.getLastname());
        user.setPhone(dto.getPhone());
        if(dto.getUsername() != currentUsername) {
            if(usernameExists(dto.getUsername())) return null;
            user.setUsername(dto.getUsername());
        }
        return userRepository.save(user);
    }

    @Override
    public User changePassword(NewPasswordDTO dto, String username) {
        User user = userRepository.findByUsername(username);
        if(!passwordEncoder.matches(dto.getOldPassword(), user.getPassword())) return null;
        user.setPassword(passwordEncoder.encode(dto.getNewPassword()));
        return userRepository.save(user);
    }

    @Override
    public UserDTO getUserDTO(String username) {
        User user = userRepository.findByUsername(username);
        UserDTO dto = modelMapper.map(user, UserDTO.class);
        dto.setRoles(user.getRoles().stream().map(i -> i.getName()).collect(Collectors.toList()));
        return dto;
    }

    @Override
    public User getById(Long id) {
        Optional<User> u = userRepository.findById(id);
        if(u.isPresent()){
            return modelMapper.map(u.get(), User.class);
        }
        throw new UserNotFoundException();
    }

    @Override
    public List<UserDTO> searchUsers(String[] searchParams) {
        List<UserDTO> users = getUsers();
        List<UserDTO> searchResult = new ArrayList<>();
        for (UserDTO dto : users) {
            for(String param : searchParams) {
                if (dto.getFirstname().toLowerCase().contains(param.toLowerCase()) || dto.getLastname().toLowerCase().contains(param.toLowerCase()) || dto.getUsername().toLowerCase().contains(param.toLowerCase()) || dto.getPhone().toLowerCase().contains(param.toLowerCase())) {
                    searchResult.add(dto);
                }
            }
        }
        return searchResult.stream().distinct().collect(Collectors.toList());
    }

    @Override
    public List<UserDTO> getTrainers() {
        log.info("Fetching trainers");
        List<User> allUsers = userRepository.findAll();
        List<UserDTO> dtos = new ArrayList<>();
        for (User u : allUsers) {
            if(u.getRoles().stream().findFirst().get().getName().equals("ROLE_TRAINER")) {
                dtos.add(getUserDTO(u.getUsername()));

            }
        }
        return dtos;
    }

    @Override
    public void deleteUser(Long userId) {
        userRepository.deleteById(userId);
    }


}
