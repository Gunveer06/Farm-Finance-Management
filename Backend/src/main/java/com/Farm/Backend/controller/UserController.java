package com.Farm.Backend.controller;

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
@CrossOrigin(origins = "http://localhost:5173")
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
    public ResponseEntity<String> login(@RequestBody Users user, HttpSession session) {
        String result = loginService.loginUser(user);

        if ("Login successful!".equals(result)) {
            Users existingUser = loginService.getUserByUsername(user.getUsername());
            session.setAttribute("userId", existingUser.getUserId());  // consistent key name
            session.setAttribute("username", existingUser.getUsername());
        }

        return ResponseEntity.ok(result);
    }
}
