/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.diferoan.Reto3ciclo3.service;

import com.diferoan.Reto3ciclo3.dao.MessageRepository;
import com.diferoan.Reto3ciclo3.entities.Message;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author Edison C
 */
@Service
public class MessageService {
    @Autowired
    MessageRepository messageRepository;
    
    public List<Message> getAll() {return (List<Message>) messageRepository.getAll();};
  
    public Optional<Message> getMessage(int id) {return messageRepository.getMessage(id);};
  
    public Message save(Message message) { 
        if (message.getIdMessage()== null){
            return messageRepository.save(message);
        }
        else
        {
            Optional<Message> co =  messageRepository.getMessage(message.getIdMessage());
            if (co.isEmpty()){
                return messageRepository.save(message);
            }
            else
            {
                return message;
            }
        }
 
    }
    
}
