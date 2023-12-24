package com.isamm.bibleoapp.dao;


import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.isamm.bibleoapp.Entity.Adherant;


public interface AdherentDao extends JpaRepository<Adherant,Long>{
  
}
