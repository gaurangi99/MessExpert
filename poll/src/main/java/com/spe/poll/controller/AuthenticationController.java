package com.spe.poll.controller;

import ch.qos.logback.classic.Logger;
import com.spe.poll.auth.AuthenticationRequest;
import com.spe.poll.auth.AuthenticationResponse;
import com.spe.poll.auth.RegisterRequest;
import lombok.RequiredArgsConstructor;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.spe.poll.service.AuthenticationService;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthenticationController {

    private final AuthenticationService service;

    private static final ch.qos.logback.classic.Logger log= (Logger) LoggerFactory.getLogger(AuthenticationController.class);

    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponse> register(@RequestBody RegisterRequest request) {
        System.out.println("REGISTER USER");
        return ResponseEntity.ok(service.register(request));
    }
    @PostMapping("/authenticate")
    public ResponseEntity<AuthenticationResponse> authenticate(@RequestBody AuthenticationRequest request) {
        System.out.println("USER LOGIN");
        if(request.getUsername().equals("admin") && request.getPassword().equals("admin")){
            log.info("success!!");
        }
        return ResponseEntity.ok(service.authenticate(request));
    }
    @PostMapping("/get")
    public String get() {
        System.out.println("Get LOGIN");
        return "Good";
    }

    @ExceptionHandler(Exception.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    public ResponseEntity<String> handleServerException(){
        log.error("AC:Internal Server error occurred!");
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Internal Server error occurred!");
    }

    @ExceptionHandler(Exception.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ResponseEntity<String> handleBadRequestException(){
        log.error("AC:Bad Request!");
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Bad Request!");
    }

    @ExceptionHandler(Exception.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public ResponseEntity<String> handleNotFoundException(){
        log.error("AC:Not Found!");
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Not Found!");
    }
}