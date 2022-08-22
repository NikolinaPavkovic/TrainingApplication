package com.thesis.trainingapp.service;

import com.thesis.trainingapp.dto.RegisterDTO;
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
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

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
    public User saveUser(RegisterDTO userDTO) {
        //add validation and error handling
        if(checkIfUsernameExists(userDTO.getUsername())) return null;
        log.info("Saving new user: {} to database", userDTO.getUsername());
        User user = modelMapper.map(userDTO, User.class);
        user.setPassword(passwordEncoder.encode(userDTO.getPassword()));
        Role role = roleRepository.findByName("ROLE_USER");
        user.getRoles().add(role);
        return userRepository.save(user);
    }

    private User prepareForSave(RegisterDTO dto) {
        User user = modelMapper.map(dto, User.class);
        user.setPassword(passwordEncoder.encode(dto.getPassword()));
        Role role = roleRepository.findByName("ROLE_USER");
        user.getRoles().add(role);
        return user;
    }

    private boolean checkIfUsernameExists(String username) {
        User u = userRepository.findByUsername(username);
        if (u == null) return false;
        return true;
    }

    @Override
    public Role saveRole(Role role) {
        if(checkIfRoleExists(role.getName())) return null;
        log.info("Saving new role: {} to database", role.getName());
        return roleRepository.save(role);
    }

    private boolean checkIfRoleExists(String name) {
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
    public List<User> getUsers() {
        log.info("Fetching all users");
        return userRepository.findAll();
    }

    @Override
    public User registerTrainer(User user) {
        log.info("Registering trainer...");
        return  null;
    }

}
