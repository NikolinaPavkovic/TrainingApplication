package com.thesis.trainingapp.service;

import com.thesis.trainingapp.dto.ReservationDTO;
import com.thesis.trainingapp.dto.TrainingDTO;
import com.thesis.trainingapp.dto.TrainingPeriodDTO;
import com.thesis.trainingapp.model.Training;

import java.util.List;

public interface TrainingService {
    Training save(TrainingDTO training);
    List<Training> getTrainings();
    Training getById(Long id);
    List<TrainingPeriodDTO> getCalendarPeriods();
    List<TrainingPeriodDTO> getTrainingsForReservation();
    String makeReservation(ReservationDTO dto);
}
