package com.thesis.trainingapp.service;

import com.thesis.trainingapp.dto.ReservationDTO;
import com.thesis.trainingapp.dto.TrainingDTO;
import com.thesis.trainingapp.dto.TrainingPeriodDTO;
import com.thesis.trainingapp.model.Training;
import com.thesis.trainingapp.model.User;
import com.thesis.trainingapp.repository.TrainingRepository;
import com.thesis.trainingapp.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.*;
import java.util.stream.Collectors;

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
        training.setStartDate(setDate(training.getStartDate()));
        training.setReservations(new ArrayList<>());
        training.setId(null);
        if(!checkIfPeriodIsFree(training)) return null;
        return trainingRepository.save(training);
    }

    private boolean checkIfPeriodIsFree(Training dto) {
        List<Training> scheduledTrainings = trainingRepository.findAll();
        for (Training training : scheduledTrainings) {
            if((dto.getStartDate().before(training.getStartDate()) && addDurationToDate(dto).after(training.getStartDate()))            ||
                (dto.getStartDate().after(training.getStartDate()) && addDurationToDate(dto).before(addDurationToDate(training)))       ||
                (dto.getStartDate().before(addDurationToDate(training)) && addDurationToDate(dto).after(addDurationToDate(training)))   ||
                dto.getStartDate().equals(training.getStartDate())                                                                      ||
                addDurationToDate(dto).equals(addDurationToDate(training))) {
                return false;
            }
        }
        return true;
    }

    private Date addDurationToDate(Training training) {
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(training.getStartDate());
        calendar.add(Calendar.MINUTE, training.getDuration());
        return calendar.getTime();
    }

    private Date setDate(Date badDate){
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(badDate);
        calendar.add(Calendar.HOUR_OF_DAY, -2);
        return calendar.getTime();
    }

    private Date setDateReturn(Date badDate){
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(badDate);
        calendar.add(Calendar.HOUR_OF_DAY, 2);
        return calendar.getTime();
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

    @Override
    public List<TrainingPeriodDTO> getCalendarPeriods() {
        List<Training> allTrainings = trainingRepository.findAll();
        List<TrainingPeriodDTO> periods = new ArrayList<>();
        for (Training training : allTrainings) {
            TrainingPeriodDTO dto = modelMapper.map(training, TrainingPeriodDTO.class);
            dto.setStartDate(dto.getStartDate());
            dto.setEndDate(addDurationToDate(training));
            periods.add(dto);
        }
        return periods;
    }

    @Override
    public List<TrainingPeriodDTO> getTrainingsForReservation() {
        List<TrainingPeriodDTO> periods = getCalendarPeriods();
        List<TrainingPeriodDTO> possiblePeriods = new ArrayList<>();
        for (TrainingPeriodDTO period :
                periods) {
            if(!period.getStartDate().before(new Date()) && !period.getStartDate().after(setCompareDate(30))) {
                possiblePeriods.add(period);
            }
        }

        return sortByDateAscending(possiblePeriods);
    }

    private List<TrainingPeriodDTO> sortByDateAscending(List<TrainingPeriodDTO> dtos) {
        List<TrainingPeriodDTO> sorted = dtos.stream().sorted(
                Comparator.comparing(TrainingPeriodDTO::getStartDate)
        ).collect(Collectors.toList());
        return sorted;
    }

    @Override
    public String makeReservation(ReservationDTO dto) {
        Optional<Training> training = trainingRepository.findById(dto.getTrainingId());
        if(hasMaximumReservations(training.get())) {
            return "Maximum capacity is full.";
        } else if(userAlreadyBooked(dto.getUserId(), training.get())) {
            return "Same user cannot book twice.";
        } else {
            User user = userService.getById(dto.getUserId());
            training.get().getReservations().add(user);
            trainingRepository.save(training.get());
            return "ok";
        }
    }

    @Override
    public List<TrainingPeriodDTO> getUserTrainings(String username) {
        List<TrainingPeriodDTO> allTrainings = getCalendarPeriods();
        List<TrainingPeriodDTO> possibleTrainings = new ArrayList<>();
        for (TrainingPeriodDTO dto : allTrainings) {
            for (User user : dto.getReservations()) {
                if(user.getUsername().equals(username)) possibleTrainings.add(dto);
            }
        }
        return possibleTrainings;
    }

    @Override
    public List<TrainingPeriodDTO> getTrainerTrainings(String username) {
        List<TrainingPeriodDTO> allTrainings = getCalendarPeriods();
        List<TrainingPeriodDTO> trainerTrainings = new ArrayList<>();
        for (TrainingPeriodDTO dto : allTrainings) {
            if(dto.getTrainer().getUsername().equals(username)) trainerTrainings.add(dto);
        }
        return trainerTrainings;
    }

    @Override
    public List<TrainingPeriodDTO> getTrainingsForAdmin() {
        List<TrainingPeriodDTO> allTrainings = getCalendarPeriods();
        List<TrainingPeriodDTO> trainingsForAdmin = new ArrayList<>();
        for (TrainingPeriodDTO dto : allTrainings) {
            if(dto.getStartDate().after(new Date())) trainingsForAdmin.add(dto);
        }
        return trainingsForAdmin;
    }

    @Override
    public void deleteReservation(Long trainingId, String username) {
        Training training = getById(trainingId);
        List<User> reservations = new ArrayList<>();
        for (User u : training.getReservations()) {
            if(u.getUsername().equals(username)) {
                reservations.remove(u);
                break;
            }
        }
        training.setReservations(reservations);
        trainingRepository.save(training);
    }

    @Override
    public void deleteTraining(Long trainingId) {
        trainingRepository.deleteById(trainingId);
    }

    private boolean userAlreadyBooked(Long userId, Training training) {
         for (var reservation: training.getReservations())
             if(reservation.getId() == userId) return true;
         return false;
    }


    private Date setCompareDate(Integer hourAmount){
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(new Date());
        calendar.add(Calendar.HOUR_OF_DAY, hourAmount);
        return calendar.getTime();
    }

    private boolean hasMaximumReservations(Training training) {
        if(training.getReservations().size() == training.getCapacity()) {
            return true;
        }
        return false;
    }
}
