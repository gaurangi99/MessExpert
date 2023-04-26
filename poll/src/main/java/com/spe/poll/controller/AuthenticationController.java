package com.spe.poll.controller;

import com.spe.poll.auth.AuthenticationRequest;
import com.spe.poll.auth.AuthenticationResponse;
import com.spe.poll.auth.RegisterRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.spe.poll.service.AuthenticationService;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthenticationController {

    private final AuthenticationService service;

    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponse> register(@RequestBody RegisterRequest request) {
        System.out.println("REGISTER USER");
        return ResponseEntity.ok(service.register(request));
    }
    @PostMapping("/authenticate")
    public ResponseEntity<AuthenticationResponse> authenticate(@RequestBody AuthenticationRequest request) {
        System.out.println("USER LOGIN");
        return ResponseEntity.ok(service.authenticate(request));
    }
    @PostMapping("/get")
    public String get() {
        System.out.println("Get LOGIN");
        return "Good";
    }
}