/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.diferoan.Reto3ciclo3.entities;

import com.diferoan.Reto3ciclo3.entities.Category;
import com.diferoan.Reto3ciclo3.entities.Motorbike;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

/**
 *
 * @author Edison C
 */
@Repository
public interface CategoryCrud extends CrudRepository<Category,Integer> {
    
}