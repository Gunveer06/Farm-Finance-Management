package com.Farm.Backend.controller;

import com.Farm.Backend.DTO.LoginRequest;
import com.Farm.Backend.DTO.RegisterRequest;
import com.Farm.Backend.entity.Users;
import com.Farm.Backend.service.UserService.LoginService;
import com.Farm.Backend.service.UserService.SignInService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/")
public class UserController {  // fixed typo

    @Autowired
    private SignInService signInService;

    @Autowired
    private LoginService loginService;

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody RegisterRequest request) {
        String result = signInService.register(request.getUsername(), request.getPassword());
        return ResponseEntity.ok(result);
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody LoginRequest loginRequest, HttpSession session) {
        System.out.println("Login session ID: " + session.getId() + ", isNew: " + session.isNew());
        String result = loginService.loginUser(loginRequest.getUsername(), loginRequest.getPassword());

        if ("Login successful!".equals(result)) {
            Users existingUser = loginService.getUserByUsername(loginRequest.getUsername());
            session.setAttribute("userId", existingUser.getUserId());
            session.setAttribute("username", existingUser.getUsername());
            System.out.println("Login success: userId=" + existingUser.getUserId() + ", sessionId=" + session.getId());
        } else {
            System.out.println("Login failed for user: " + loginRequest.getUsername());
        }

        return ResponseEntity.ok(result);
    }

}
