/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.diferoan.Reto3ciclo3.service;

import Report.CountClients;
import Report.StatusReserve;
import com.diferoan.Reto3ciclo3.dao.ReservationRepository;
import com.diferoan.Reto3ciclo3.entities.Reservation;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;

/**
 *
 * @author Edison C
 */
@Service
public class ReservationService {
    @Autowired
    ReservationRepository reservationRepository;
    
    public List<Reservation> getAll() {return (List<Reservation>) reservationRepository.getAll();};
  
    public Optional<Reservation> getReservation(int id) {return reservationRepository.getReservation(id);};
  
    public Reservation save(Reservation reservation) { 
        if (reservation.getIdReservation()== null){
            return reservationRepository.save(reservation);
        }
        else
        {
            Optional<Reservation> co =  reservationRepository.getReservation(reservation.getIdReservation());
            if (co.isEmpty()){
                return reservationRepository.save(reservation);
            }
            else
            {
                return reservation;
            }
        }
    }
    public StatusReserve getReporteStatusReservation(){
     List<Reservation>completed= reservationRepository.ReservationStatus("completed");    
     List<Reservation>cancelled= reservationRepository.ReservationStatus("cancelled");  
    return new StatusReserve (completed.size(), cancelled.size());
  }
     
    public List<Reservation> getReporteTimeReservation (String datoA, String datoB){
    SimpleDateFormat parser=new SimpleDateFormat ("yyyy-MM-dd");
    Date datoUno = new Date();
    Date datoDos = new Date();

try{
    datoUno = parser.parse(datoA);
    datoDos = parser.parse(datoB);
    
}catch(ParseException evt){
    evt.printStackTrace();
}if(datoUno.before(datoDos)){
    return reservationRepository.ReservationTiempo(datoUno, datoDos);
}else{
    return new ArrayList<>();
}

}
public List<CountClients> serviceTopClients (){
    return reservationRepository.getTopClients();
}

}