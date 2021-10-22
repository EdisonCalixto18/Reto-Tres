/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.diferoan.Reto3ciclo3.service;

import com.diferoan.Reto3ciclo3.dao.MotorbikeRepository;
import com.diferoan.Reto3ciclo3.entities.Motorbike;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author Edison C
 */
@Service
public class MotorbikeService {
    @Autowired
    MotorbikeRepository motorbikeRepository;
    
    public List<Motorbike> getAll() {return (List<Motorbike>) motorbikeRepository.getAll();};
  
    public Optional<Motorbike> getMotorbike(int id) {return motorbikeRepository.getMotorbike(id);};
  
    public Motorbike save(Motorbike motorbike) { 
        if (motorbike.getId()== null){
            return motorbikeRepository.save(motorbike);
        }
        else
        {
            Optional<Motorbike> co =  motorbikeRepository.getMotorbike(motorbike.getId());
            if (co.isEmpty()){
                return motorbikeRepository.save(motorbike);
            }
            else
            {
                return motorbike;
            }
        }
 
    }
    
}
