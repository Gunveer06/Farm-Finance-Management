package com.Farm.Backend.controller;

import com.Farm.Backend.DTO.RegisterRequest;
import com.Farm.Backend.entity.Users;
import com.Farm.Backend.service.Register.LoginService;
import com.Farm.Backend.service.Register.SignInService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/")
@CrossOrigin(origins = "http://localhost:5173")
public class UserContoller {

    @Autowired
    SignInService service;

    @Autowired
    LoginService loginService;

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody RegisterRequest request) {
        String result = service.register(request.username, request.password);
        return ResponseEntity.ok(result);
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody Users user) {
        String result = loginService.loginUser(user);
        return ResponseEntity.ok(result);
    }
}
