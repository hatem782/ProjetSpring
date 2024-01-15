package com.isamm.bibleoapp.dao;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.isamm.bibleoapp.Entity.Review;

public interface ReviewDao extends JpaRepository<Review, Long> {

    // find by id
    @Query("SELECT r FROM Review r JOIN FETCH r.livre JOIN FETCH r.adherent WHERE r.id = :id")
    Optional<Review> findByIdWithDetails(Long id);

    // find all
    @Query("SELECT r FROM Review r JOIN FETCH r.livre JOIN FETCH r.adherent")
    List<Review> findAllWithDetails();
    
    // find all by livre id
    @Query("SELECT r FROM Review r JOIN FETCH r.livre JOIN FETCH r.adherent WHERE r.livre.id = :id")
    List<Review> findAllByLivreId(Long id);

}
