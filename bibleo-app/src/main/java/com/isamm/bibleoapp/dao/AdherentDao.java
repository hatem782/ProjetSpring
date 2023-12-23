package com.isamm.bibleoapp.dao;


import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.isamm.bibleoapp.Entity.Adherant;


public interface AdherentDao extends JpaRepository<Adherant,Long>{
    //  // Find by id with emprunts
    //  @Query("SELECT u FROM Users u LEFT JOIN FETCH u.emprunt WHERE u.id = :id AND u.role.name = 'USER'")
    //  Optional<Adherant> findByIdWithEmprunts(Long id);
     
   
    //    // Find all with emprunts
    //    @Query("SELECT DISTINCT u FROM Users u LEFT JOIN FETCH u.emprunt WHERE u.role.name = 'USER'")
    //    List<Adherant> findAllWithEmprunts();
}
