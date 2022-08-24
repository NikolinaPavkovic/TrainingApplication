package com.thesis.trainingapp.service;

import com.thesis.trainingapp.dto.TrainingDTO;
import com.thesis.trainingapp.model.Training;
import com.thesis.trainingapp.repository.TrainingRepository;
import com.thesis.trainingapp.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class TrainingServiceImpl implements TrainingService{
    private final ModelMapper modelMapper = new ModelMapper();
    private final UserService userService;
    private final TrainingRepository trainingRepository;

    @Override
    public Training save(TrainingDTO dto) {
        Training training = modelMapper.map(dto, Training.class);
        training.setTrainer(userService.getById(dto.getTrainerId()));
        return trainingRepository.save(training);
    }

    @Override
    public List<Training> getTrainings() {
        return trainingRepository.findAll();
    }

    @Override
    public Training getById(Long id) {
        Optional<Training> training = trainingRepository.findById(id);
        if(training.isPresent()){
            return modelMapper.map(training.get(), Training.class);
        }
        return null;
    }
}
