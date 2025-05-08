package com.Farm.Backend.controller;

import com.Farm.Backend.entity.Users;
import com.Farm.Backend.service.Register.LoginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:5173")
public class LoginController {

    @Autowired
    private LoginService loginService;

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody Users user) {
        String result = loginService.loginUser(user);
        return ResponseEntity.ok(result);
    }
}
