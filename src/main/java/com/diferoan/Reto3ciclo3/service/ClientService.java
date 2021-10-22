/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.diferoan.Reto3ciclo3.service;

import com.diferoan.Reto3ciclo3.dao.ClientRepository;
import com.diferoan.Reto3ciclo3.entities.Client;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author Edison C
 */
@Service
public class ClientService {
    @Autowired
    ClientRepository clientRepository;
    
    public List<Client> getAll() {return (List<Client>) clientRepository.getAll();};
  
    public Optional<Client> getClient(int id) {return clientRepository.getClient(id);};
  
    public Client save(Client client) { 
        if (client.getIdClient()== null){
            return clientRepository.save(client);
        }
        else
        {
            Optional<Client> co =  clientRepository.getClient(client.getIdClient());
            if (co.isEmpty()){
                return clientRepository.save(client);
            }
            else
            {
                return client;
            }
        }
 
    }
    
}
