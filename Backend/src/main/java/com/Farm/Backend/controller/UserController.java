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
public class UserController {

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
        String result = loginService.loginUser(loginRequest.getUsername(), loginRequest.getPassword());

        if ("Login successful!".equals(result)) {
            Users existingUser = loginService.getUserByUsername(loginRequest.getUsername());
            session.setAttribute("userId", existingUser.getUserId());
            session.setAttribute("username", existingUser.getUsername());
        }
        return ResponseEntity.ok(result);
    }
}
