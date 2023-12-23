package com.isamm.bibleoapp.dao;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.isamm.bibleoapp.Entity.Commentaire;



public interface CommentaireDao extends JpaRepository<Commentaire,Long>{

    //find by id
    @Query("SELECT c FROM Commentaire c JOIN FETCH c.livre JOIN FETCH c.adherent WHERE c.id = :id")
    Optional<Commentaire> findByIdWithDetails(Long id);

    //find all 
     @Query("SELECT c FROM Commentaire c JOIN FETCH c.livre JOIN FETCH c.adherent")
    List<Commentaire> findAllWithDetails();
}
