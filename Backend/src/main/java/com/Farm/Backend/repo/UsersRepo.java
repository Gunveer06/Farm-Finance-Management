package com.Farm.Backend.repo;

import com.Farm.Backend.entity.Users;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UsersRepo extends JpaRepository<Users,Integer> {
    boolean existsByUsername(String username);
    Users findByUsername(String username);
}
