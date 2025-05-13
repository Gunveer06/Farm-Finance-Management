package com.Farm.Backend.entity;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.math.BigDecimal;

@Entity
@Table(name = "budget_plans")
public class BudgetPlans {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "plan_id")
    private Integer planId;

    @Column(name = "crop_name")
    private String cropName;

    @Column(name = "season")
    private String season;

    @Column(name = "estimated_cost")
    private BigDecimal cost;

    @Column(name = "plan_date")
    private LocalDate date;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private Users user;

    public BudgetPlans() {}

    public BudgetPlans(Integer planId, String cropName, String season, BigDecimal cost, LocalDate date, Users user) {
        this.planId = planId;
        this.cropName = cropName;
        this.season = season;
        this.cost = cost;
        this.date = date;
        this.user = user;
    }

    public Integer getPlanId() { return planId; }
    public void setPlanId(Integer planId) { this.planId = planId; }
    public String getCropName() { return cropName; }
    public void setCropName(String cropName) { this.cropName = cropName; }
    public String getSeason() { return season; }
    public void setSeason(String season) { this.season = season; }
    public BigDecimal getCost() { return cost; }
    public void setCost(BigDecimal cost) { this.cost = cost; }
    public LocalDate getDate() { return date; }
    public void setDate(LocalDate date) { this.date = date; }
    public Users getUser() { return user; }
    public void setUser(Users user) { this.user = user; }
}
