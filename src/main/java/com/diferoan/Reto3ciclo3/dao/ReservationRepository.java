/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.diferoan.Reto3ciclo3.dao;

import Report.CountClients;
import com.diferoan.Reto3ciclo3.entities.Client;
import com.diferoan.Reto3ciclo3.entities.Reservation;
import com.diferoan.Reto3ciclo3.entities.ReservationCrud;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

/**
 *
 * @author Edison C
 */
@Repository
public class ReservationRepository {
  @Autowired
  private ReservationCrud reservationCrudRepository;
  
  public List<Reservation> getAll() {return (List<Reservation>) reservationCrudRepository.findAll();};
  
  public Optional<Reservation> getReservation(int id) {return reservationCrudRepository.findById(id);};
  
  public Reservation save(Reservation reservation) { return reservationCrudRepository.save(reservation);};
  
    
  public List<Reservation> ReservationStatus (String status){
      return reservationCrudRepository.findAllByStatus(status);  
  }
  
  public List<Reservation> ReservationTiempo (Date a, Date b){
      return reservationCrudRepository.findAllByStartDateAfterAndStartDateBefore(a, b);
  }
  
  public List<CountClients> getTopClients(){
      List<CountClients> res=new ArrayList<>();
      List<Object[]>report = reservationCrudRepository.countTotalReservationsByClient();
      for(int i=0; i<report.size();i++){
          res.add(new CountClients((Long)report.get(i)[1],(Client) report.get(i)[0]));
      }
 
return res;

  }
  
}

  

