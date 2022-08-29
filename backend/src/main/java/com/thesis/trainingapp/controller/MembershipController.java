package com.thesis.trainingapp.controller;

import com.thesis.trainingapp.dto.MembershipDTO;
import com.thesis.trainingapp.model.Membership;
import com.thesis.trainingapp.service.MembershipService;
import com.thesis.trainingapp.service.UserMembershipService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/memberships")
public class MembershipController {
    private final MembershipService membershipService;
    private final UserMembershipService userMembershipService;

    @GetMapping
    public ResponseEntity<List<Membership>> getMemberships() {
        return ResponseEntity.ok().body(membershipService.getMemberships());
    }

    @PostMapping
    public ResponseEntity<String> saveMembership(@RequestBody MembershipDTO dto) {
        membershipService.saveMembreship(dto);
        return ResponseEntity.ok().body("Membership saved");
    }

    @DeleteMapping("/{memId}")
    public ResponseEntity<String> deleteMembership(@PathVariable Long memId) {
        userMembershipService.deleteUserMembershipsByMembershipId(memId);
        membershipService.delete(memId);
        return ResponseEntity.ok().body("Membership deleted.");
    }
}
