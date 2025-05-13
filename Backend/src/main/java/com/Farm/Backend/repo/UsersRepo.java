package com.Farm.Backend.repo;

import com.Farm.Backend.entity.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UsersRepo extends JpaRepository<Users, Long> {
    boolean existsByUsername(String username);
    Users findByUsername(String username);
}
