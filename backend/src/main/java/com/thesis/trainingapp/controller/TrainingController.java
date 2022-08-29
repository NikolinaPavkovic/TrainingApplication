package com.thesis.trainingapp.controller;

import com.thesis.trainingapp.dto.ReservationDTO;
import com.thesis.trainingapp.dto.TrainingDTO;
import com.thesis.trainingapp.dto.TrainingPeriodDTO;
import com.thesis.trainingapp.model.Training;
import com.thesis.trainingapp.service.TrainingService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/trainings")
public class TrainingController {
    private final TrainingService trainingService;

    @GetMapping
    public ResponseEntity<List<Training>> getTrainings(){
        return ResponseEntity.ok().body(trainingService.getTrainings());
    }

    @PostMapping
    public ResponseEntity<String> saveTraining(@RequestBody TrainingDTO dto) {
        if(trainingService.save(dto) == null) {
            return ResponseEntity.ok().body("Appointment already booked.");
        }
        return ResponseEntity.ok().body("Training saved.");
    }

    @GetMapping("/getPeriods")
    public ResponseEntity<List<TrainingPeriodDTO>> getTrainingPeriods() {
        return ResponseEntity.ok().body(trainingService.getCalendarPeriods());
    }

    @GetMapping("/getTrainingsForReservation")
    public ResponseEntity<List<TrainingPeriodDTO>> getTrainingsForReservation() {
        return ResponseEntity.ok().body(trainingService.getTrainingsForReservation());
    }

    @PostMapping("/makeReservation")
    public ResponseEntity<String> makeReservation(@RequestBody ReservationDTO reservationDTO) {
        return ResponseEntity.ok().body(trainingService.makeReservation(reservationDTO));
    }
}
