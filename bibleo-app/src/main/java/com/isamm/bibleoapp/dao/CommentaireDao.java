package com.isamm.bibleoapp.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.isamm.bibleoapp.Entity.Commentaire;



public interface CommentaireDao extends JpaRepository<Commentaire,Long>{
    
}
