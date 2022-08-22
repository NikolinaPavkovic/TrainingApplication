package com.thesis.trainingapp.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class RegisterDTO {
    private String firstname;
    private String lastname;
    private String phone;
    private String username;
    private String password;
}
