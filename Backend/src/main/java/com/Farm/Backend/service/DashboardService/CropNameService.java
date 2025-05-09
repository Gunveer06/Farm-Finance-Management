package com.Farm.Backend.service.DashboardService;

import com.Farm.Backend.entity.BudgetPlans;
import com.Farm.Backend.repo.BudgetPlanRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CropNameService {

    @Autowired
    private BudgetPlanRepo budgetPlansRepository;

    public String getCropNameByUserId(Long userId) {
        List<String> cropNames = budgetPlansRepository.findCropNamesByUserId(userId);
        if (cropNames != null && !cropNames.isEmpty()) {
            return cropNames.get(0); // return first crop name
        } else {
            return "No crop found";
        }
    }

}
