package com.thesis.trainingapp.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MembershipDTO {
    private String name;
    private Integer price;
    private Integer durationInDays;
    private String[] benefits;
}
