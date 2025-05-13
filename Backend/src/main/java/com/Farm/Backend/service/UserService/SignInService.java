package com.Farm.Backend.service.UserService;

import com.Farm.Backend.entity.Users;
import com.Farm.Backend.repo.UsersRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SignInService {

    @Autowired
    private UsersRepo usersRepo;

    public String register(String username, String password) {
        if (usersRepo.existsByUsername(username)) {
            return "User with username '" + username + "' already exists.";
        }
        Users newUser = new Users();
        newUser.setUsername(username);
        newUser.setPassword(password); // TODO: Hash password in production!
        usersRepo.save(newUser);
        return "User registered";
    }
}
