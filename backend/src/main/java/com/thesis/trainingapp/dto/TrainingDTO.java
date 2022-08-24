package com.thesis.trainingapp.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TrainingDTO {
    private String name;
    private Date startDate;
    private Integer duration;
    private Long trainerId;
    private Integer capacity;
}
