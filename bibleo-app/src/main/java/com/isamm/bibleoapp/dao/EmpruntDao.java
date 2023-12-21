package com.isamm.bibleoapp.dao;


import org.springframework.data.jpa.repository.JpaRepository;

import com.isamm.bibleoapp.Entity.Emprunt;




public interface EmpruntDao extends JpaRepository<Emprunt,Long>{
    
}
