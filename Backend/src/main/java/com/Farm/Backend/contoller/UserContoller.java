package com.Farm.Backend.contoller;

import com.Farm.Backend.DTO.RegisterRequest;
import com.Farm.Backend.service.Register.SignInService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/")
@CrossOrigin(origins = "http://localhost:3000")
public class UserContoller {

    @Autowired
    SignInService service;

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody RegisterRequest request) {
        String result = service.register(request.username, request.password);
        return ResponseEntity.ok(result);
    }
}
