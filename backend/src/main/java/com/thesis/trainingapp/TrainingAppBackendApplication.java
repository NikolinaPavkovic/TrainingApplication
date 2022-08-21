package com.thesis.trainingapp;

import com.thesis.trainingapp.model.Role;
import com.thesis.trainingapp.model.User;
import com.thesis.trainingapp.service.UserService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.ArrayList;

@SpringBootApplication
public class TrainingAppBackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(TrainingAppBackendApplication.class, args);
    }

    @Bean
    PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }

    /*@Bean
    CommandLineRunner run(UserService userService) {
        return args -> {
            userService.saveRole(new Role(null, "ROLE_USER"));
            userService.saveRole(new Role(null, "ROLE_ADMIN"));
            userService.saveRole(new Role(null, "ROLE_TRAINER"));

            userService.saveUser(new User(null, "Nina", "Pavkovic", "nina", "123456", new ArrayList<>()));

            userService.addRoleToUser("nina", "ROLE_USER");
            userService.addRoleToUser("nina", "ROLE_MANAGER");
        };
    }*/

}
