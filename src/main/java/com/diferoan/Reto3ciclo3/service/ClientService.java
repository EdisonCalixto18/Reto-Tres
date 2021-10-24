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
    
    public Client update(Client category){
    if (category.getIdClient()!=null){     
        Optional<Client>g=clientRepository.getClient(category.getIdClient());
        if(!g.isEmpty()){
            if (category.getName()!=null){
                g.get().setName(category.getName());
            }
            if(category.getEmail()!=null){
                g.get().setEmail(category.getEmail());
            }    
            
            if(category.getPassword()!=null){
                g.get().setPassword(category.getPassword());  
                
            }
            
            if(category.getAge()!=null){
                g.get().setAge(category.getAge());  
                
            }
            return clientRepository.save(g.get());
            
        }
    }
    return category;

  }

    public boolean deleteClient(int id){
    Optional<Client> c=getClient(id);
    if(!c.isEmpty()){
        clientRepository.delete(c.get());
         return true;

    }
    return false;
    
  }
    
}
