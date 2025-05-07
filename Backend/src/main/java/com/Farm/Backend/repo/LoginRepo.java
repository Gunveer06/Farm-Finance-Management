// UserRepository.java
package com.Farm.Backend.repo;


import com.Farm.Backend.entity.Users;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LoginRepo extends JpaRepository<Users, Integer> {
    Users findByUsername(String username);
}
