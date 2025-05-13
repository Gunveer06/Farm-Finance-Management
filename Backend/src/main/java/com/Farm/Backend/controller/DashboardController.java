package com.Farm.Backend.controller;

import com.Farm.Backend.entity.Users;
import com.Farm.Backend.service.DashboardService.CropNameService;
import com.Farm.Backend.service.UserService.LoginService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/")
public class DashboardController {

    @Autowired
    private LoginService loginService;

    @Autowired
    private CropNameService cropNameService;

    @GetMapping("/getUserData")
    public ResponseEntity<?> getUserData(HttpSession session) {
        Object userIdObj = session.getAttribute("userId");
        if (userIdObj == null) {
            return ResponseEntity.status(401).body("User not logged in");
        }

        Long userId;
        if (userIdObj instanceof Integer) {
            userId = ((Integer) userIdObj).longValue();
        } else if (userIdObj instanceof Long) {
            userId = (Long) userIdObj;
        } else {
            return ResponseEntity.status(401).body("Invalid session userId");
        }

        Users user = loginService.getUserById(userId);
        if (user == null) {
            return ResponseEntity.status(404).body("User not found");
        }

        String cropName = cropNameService.getCropNameByUserId(userId);

        Map<String, Object> userData = new HashMap<>();
        userData.put("username", user.getUsername());
        userData.put("cropName", cropName);

        return ResponseEntity.ok(userData);
    }
}
