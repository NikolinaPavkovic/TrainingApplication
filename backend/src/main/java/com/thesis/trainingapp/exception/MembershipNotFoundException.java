package com.thesis.trainingapp.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.NOT_FOUND, reason = "Membership not found!")
public class MembershipNotFoundException extends RuntimeException{
}
