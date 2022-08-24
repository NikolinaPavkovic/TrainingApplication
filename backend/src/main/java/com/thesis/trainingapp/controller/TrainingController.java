package com.thesis.trainingapp.controller;

import com.thesis.trainingapp.dto.TrainingDTO;
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
        trainingService.save(dto);
        return ResponseEntity.ok().body("Training saved.");
    }
}
