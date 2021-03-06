/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.diferoan.Reto3ciclo3.service;

import Report.CountClients;
import Report.StatusReserve;
import com.diferoan.Reto3ciclo3.entities.Reservation;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author Edison C
 */
@RestController
@RequestMapping("/api/Reservation")
@CrossOrigin(origins = "*", methods= {RequestMethod.GET,RequestMethod.POST,RequestMethod.PUT,RequestMethod.DELETE})
public class ReservationController {
    @Autowired
    private ReservationService reservationService;
    
    @GetMapping("/all")
      public List<Reservation> getReservation() {return reservationService.getAll();};

    @GetMapping("/{id}")
      public Optional<Reservation> getCustome(@PathVariable("id") int reservationId) {
          return reservationService.getReservation(reservationId);
      }
    @PostMapping("/save")
    @ResponseStatus(HttpStatus.CREATED)
      public Reservation save(@RequestBody Reservation reservation) {return reservationService.save(reservation);};
    
  
      @GetMapping("/report-status")
      public StatusReserve getReserve(){
          return reservationService.getReporteStatusReservation();
      }
      
     @GetMapping("/report-dates/{dateOne}/{dateTwo}")
      public List<Reservation>getReservationTime (@PathVariable("dateOne")String dateOne, @PathVariable("dateTwo")String dateTwo ){
          return reservationService.getReporteTimeReservation(dateOne, dateTwo);
          
      }
 
    @GetMapping("/report-clients")
    public List<CountClients> getClients(){
        return reservationService.serviceTopClients();
    
    }
}
