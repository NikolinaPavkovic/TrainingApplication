package com.thesis.trainingapp.dto;

import com.thesis.trainingapp.model.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TrainingPeriodDTO {
    private Long id;
    private String name;
    private Date startDate;
    private Date endDate;
    private Integer duration;
    private User trainer;
    private Integer capacity;
    private String description;
    private List<User> reservations;
}
