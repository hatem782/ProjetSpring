package com.isamm.bibleoapp.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.isamm.bibleoapp.Entity.Auteur;



public interface AuteurDao extends JpaRepository<Auteur,Long> {
 
}
