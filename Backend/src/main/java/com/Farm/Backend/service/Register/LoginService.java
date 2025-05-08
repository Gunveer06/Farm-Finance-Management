// LoginService.java
package com.Farm.Backend.service.Register;

import com.Farm.Backend.entity.Users;
import com.Farm.Backend.repo.LoginRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class LoginService {

    @Autowired
    private LoginRepo loginRepository;

    public String loginUser(Users user) {
        // Find user by username
        Users existingUser = loginRepository.findByUsername(user.getUsername());
        if (existingUser == null) {
            return "User not found!";
        }
        // Check if user exists and password matches

        else if (  existingUser.getPassword().equals(user.getPassword())) {
            return "Login successful!";
        } else {
            return "Invalid username or password!";
        }
    }
}
