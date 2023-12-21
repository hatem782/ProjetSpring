package com.isamm.bibleoapp.dao;


import org.springframework.data.jpa.repository.JpaRepository;

import com.isamm.bibleoapp.Entity.Livre;



public interface LivreDao extends JpaRepository<Livre,Long>{
    
}
