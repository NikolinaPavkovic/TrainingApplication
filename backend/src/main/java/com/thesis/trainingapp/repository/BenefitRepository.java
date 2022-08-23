package com.thesis.trainingapp.repository;

import com.thesis.trainingapp.model.Benefit;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BenefitRepository extends JpaRepository<Benefit, Long> {
    Benefit findByName(String name);
}
