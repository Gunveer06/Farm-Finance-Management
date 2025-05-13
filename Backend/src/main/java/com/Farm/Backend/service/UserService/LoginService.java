package com.Farm.Backend.service.UserService;

import com.Farm.Backend.entity.Users;
import com.Farm.Backend.repo.UsersRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class LoginService {

    @Autowired
    private UsersRepo usersRepo;

    public String loginUser(String username, String password) {
        Users existingUser = usersRepo.findByUsername(username);
        if (existingUser == null) {
            return "User not found!";
        }
        if (existingUser.getPassword().equals(password)) {
            return "Login successful!";
        } else {
            return "Invalid username or password!";
        }
    }

    public Users getUserByUsername(String username) {
        return usersRepo.findByUsername(username);
    }

    public Users getUserById(Long id) {
        return usersRepo.findById(id).orElse(null);
    }
}
