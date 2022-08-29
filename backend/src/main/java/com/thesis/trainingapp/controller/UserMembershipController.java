package com.thesis.trainingapp.controller;

import com.thesis.trainingapp.dto.UserMembershipDTO;
import com.thesis.trainingapp.model.User;
import com.thesis.trainingapp.model.UserMembership;
import com.thesis.trainingapp.service.UserMembershipService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/userMemberships")
public class UserMembershipController {
    private final UserMembershipService userMembershipService;

    @GetMapping
    public ResponseEntity<List<UserMembership>> getUserMemberships(){
        return ResponseEntity.ok().body(userMembershipService.getMemberships());
    }

    @PostMapping
    public ResponseEntity<String> addUserMembership(@RequestBody UserMembershipDTO dto) {
        if(userMembershipService.save(dto) == null) return new ResponseEntity<>("User membership already exists.", HttpStatus.OK);
        return new ResponseEntity<>("User membership created.", HttpStatus.CREATED);
    }

    @GetMapping("/get/{username}")
    public ResponseEntity<?> getUserMembership(@PathVariable String username){
        UserMembership userMembership = userMembershipService.get(username);
        if (userMembership == null) return ResponseEntity.ok().body("No membership.");
        return ResponseEntity.ok().body(userMembershipService.get(username));
    }

}
