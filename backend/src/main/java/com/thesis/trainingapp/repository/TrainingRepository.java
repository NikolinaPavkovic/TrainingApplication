package com.thesis.trainingapp.repository;

import com.thesis.trainingapp.model.Training;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface TrainingRepository extends JpaRepository<Training, Long> {
    Optional<Training> findById(Long id);
}
