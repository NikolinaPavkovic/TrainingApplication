package com.thesis.trainingapp.controller;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.thesis.trainingapp.dto.*;
import com.thesis.trainingapp.filter.CustomAuthorizationFilter;
import com.thesis.trainingapp.model.Role;
import com.thesis.trainingapp.model.User;
import com.thesis.trainingapp.model.UserMembership;
import com.thesis.trainingapp.service.UserMembershipService;
import com.thesis.trainingapp.service.UserService;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.net.URI;
import java.security.Principal;
import java.util.*;
import java.util.stream.Collectors;

import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;

@RestController
@RequiredArgsConstructor
@RequestMapping("/users")
public class UserController {
    private final UserService userService;
    private final UserMembershipService userMembershipService;

    @GetMapping
    public ResponseEntity<List<UserDTO>> getUsers(){
        return ResponseEntity.ok().body(userService.getUsers());
    }

    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@RequestBody RegisterDTO userDTO){
        User u = userService.saveUser(userDTO, "ROLE_USER");
        if(u == null){
            return new ResponseEntity<>("Username already exists!", HttpStatus.OK);
        }
        return new ResponseEntity<>("User created.", HttpStatus.CREATED);
    }

    @PostMapping("/search")
    public ResponseEntity<List<UserDTO>> searchUsers(@RequestBody String[] searchParams) {
        return ResponseEntity.ok().body(userService.searchUsers(searchParams));
    }

    @PostMapping("/registerTrainer")
    //@PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<String> registerTrainer(@RequestBody RegisterDTO userDTO){
        User u = userService.saveUser(userDTO, "ROLE_TRAINER");
        if(u == null){
            return new ResponseEntity<>("Username already exists!", HttpStatus.CONFLICT);
        }
        return new ResponseEntity<>("User created.", HttpStatus.CREATED);
    }

    @GetMapping("/getLoggedUser")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<UserDTO> getLoggedUser(Principal user){
        if(user == null) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok().body(this.userService.getUserDTO(user.getName()));
    }

    @PutMapping("/edit")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<String> editUser(@RequestBody EditProfileDTO dto, Principal user){
        User u = this.userService.editUser(dto, user.getName());
        if(u == null) return ResponseEntity.status(409).body("Username already exists!");
        return ResponseEntity.ok().body("User edited.");
    }

    @PutMapping("/changePassword")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<String> changePassword(@RequestBody NewPasswordDTO passwordDTO, Principal user){
        User u = userService.changePassword(passwordDTO, user.getName());
        if(u == null) return ResponseEntity.ok().body("Wrong current password");
        return ResponseEntity.ok().body("Password changed.");
    }

    @GetMapping("/getTrainers")
    public ResponseEntity<List<UserDTO>> getTrainers(){
        return ResponseEntity.ok().body(userService.getTrainers());
    }

    @DeleteMapping("/{userId}")
    public ResponseEntity<String> deleteUser(@PathVariable Long userId){
        userService.deleteUser(userId);
        return ResponseEntity.ok().body("User deleted.");
    }

    @GetMapping("/getUserForAdmin/{username}")
    public ResponseEntity<UserMembership> getUserForAdmin(@PathVariable String username) {
        return ResponseEntity.ok().body(userMembershipService.get(username));
    }

    @GetMapping("/{username}")
    public ResponseEntity<User> getUser(@PathVariable String username) {
        User user = userService.getUser(username);
        return ResponseEntity.ok().body(user);
    }

    @PostMapping("/saveRole")
    public ResponseEntity<String> saveRole(@RequestBody Role role){
        URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/users/saveRole").toUriString());
        Role r = userService.saveRole(role);
        if(r == null) {
            return new ResponseEntity<>("Role already exists!", HttpStatus.CONFLICT);
        }
        return ResponseEntity.created(uri).body("Role created!");
    }

    @PostMapping("/addRoleToUser")
    public ResponseEntity<?> addRoleToUser(@RequestBody RoleToUserDTO dto){
        userService.addRoleToUser(dto.getUsername(), dto.getRoleName());
        return ResponseEntity.ok().build();
    }

    @GetMapping("/token/refresh")
    @PreAuthorize("isAuthenticated()")
    public void refreshToken(HttpServletRequest request, HttpServletResponse response) throws IOException {
        String authorizationHeader = request.getHeader(HttpHeaders.AUTHORIZATION);
        if(authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            try {
                String refreshToken = authorizationHeader.substring("Bearer ".length());
                Algorithm algorithm = Algorithm.HMAC256("secret".getBytes());
                JWTVerifier verifier = JWT.require(algorithm).build();
                DecodedJWT decodedJWT = verifier.verify(refreshToken);
                String username = decodedJWT.getSubject();
                User user = userService.getUser(username);
                String access_token = JWT.create()
                        .withSubject(user.getUsername())
                        .withExpiresAt(new Date(System.currentTimeMillis() + 10 * 60 * 1000))
                        .withIssuer(request.getRequestURL().toString())
                        .withClaim("roles", user.getRoles().stream().map(Role::getName).collect(Collectors.toList()))
                        .sign(algorithm);
                Map<String, String> tokens = new HashMap<>();
                tokens.put("access_token", access_token);
                tokens.put("refresh_token", refreshToken);
                response.setContentType(APPLICATION_JSON_VALUE);
                new ObjectMapper().writeValue(response.getOutputStream(), tokens);
            } catch (Exception exception){
                CustomAuthorizationFilter.setHeaders(response, exception);
            }
        } else {
            throw new RuntimeException("Refresh token is missing");
        }
    }
}

@Data
class RoleToUserDTO{
    private String username;
    private String roleName;
}
