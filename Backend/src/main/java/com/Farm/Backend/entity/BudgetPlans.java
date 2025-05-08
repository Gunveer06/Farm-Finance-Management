package com.Farm.Backend.entity;

import jakarta.persistence.*;
import org.springframework.boot.autoconfigure.web.WebProperties;

import java.time.LocalDate;

@Entity
public class BudgetPlans {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int plan_id ;
    @OneToOne
    @JoinColumn(name = "user_id")
    private Users user_id ;

    private String crop_name ;

    private String season ;

    private float cost ;

    private LocalDate Date ;

    public BudgetPlans(int plan_id, Users user_id, String crop_name, String season, float cost, LocalDate date) {
        this.plan_id = plan_id;
        this.user_id = user_id;
        this.crop_name = crop_name;
        this.season = season;
        this.cost = cost;
        Date = date;
    }
    public BudgetPlans(){

    };

    public LocalDate getDate() {
        return Date;
    }

    public void setDate(LocalDate date) {
        Date = date;
    }

    public float getCost() {
        return cost;
    }

    public void setCost(float cost) {
        this.cost = cost;
    }

    public String getSeason() {
        return season;
    }

    public void setSeason(String season) {
        this.season = season;
    }

    public String getCrop_name() {
        return crop_name;
    }

    public void setCrop_name(String crop_name) {
        this.crop_name = crop_name;
    }

    public Users getUser_id() {
        return user_id;
    }

    public void setUser_id(Users user_id) {
        this.user_id = user_id;
    }

    public int getPlan_id() {
        return plan_id;
    }

    public void setPlan_id(int plan_id) {
        this.plan_id = plan_id;
    }
}
