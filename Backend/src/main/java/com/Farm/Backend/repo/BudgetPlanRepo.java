package com.Farm.Backend.repo;

import com.Farm.Backend.entity.BudgetPlans;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface BudgetPlanRepo extends JpaRepository<BudgetPlans, Long> {

    @Query("SELECT b.cropName FROM BudgetPlans b WHERE b.user.userId = :userId")
    List<String> findCropNamesByUserId(@Param("userId") Long userId);

}
