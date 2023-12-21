package com.isamm.bibleoapp.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.isamm.bibleoapp.Entity.Auteur;


public interface AuteurDao extends JpaRepository<Auteur,Long> {
    
}
