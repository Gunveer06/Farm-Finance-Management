package com.Farm.Backend.service.UserService;

import com.Farm.Backend.entity.Users;
import com.Farm.Backend.repo.UsersRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SignInService {

    @Autowired
    UsersRepo usersRepo;

    public String register(String username, String password) {
        // Check if user already exists
        if (usersRepo.existsByUsername(username)) {
            return "User with username '" + username + "' already exists.";
        }

        // Create new user
        Users newUser = new Users();
        newUser.setUsername(username);
        newUser.setPassword(password);

        // Save to database
        Users savedUser = usersRepo.save(newUser);

        // Return or log saved user details
        return "User registered";
    }
}

