// LoginService.java
package com.Farm.Backend.service.UserService;

import com.Farm.Backend.entity.Users;
import com.Farm.Backend.repo.LoginRepo;
import jakarta.persistence.Id;
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
    public Users getUserByUsername(String username){
       return loginRepository.findByUsername(username);
    }
    public Users getUserById(Long id) {
        return loginRepository.findById(Math.toIntExact(id)).orElse(null);
    }
}
