package com.isamm.bibleoapp.dao;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.isamm.bibleoapp.Entity.Commentaire;

public interface CommentaireDao extends JpaRepository<Commentaire, Long> {

    // find by id
    @Query("SELECT c FROM Commentaire c JOIN FETCH c.livre JOIN FETCH c.adherent WHERE c.id = :id")
    Optional<Commentaire> findByIdWithDetails(Long id);

    default Optional<Commentaire> findAndLogByIdWithDetails(Long id) {
        Optional<Commentaire> result = findByIdWithDetails(id);
        if (result.isPresent()) {
            // Log the comment details or any other relevant information
            System.out.println("Comment found: " + result.get());
        } else {
            System.out.println("Comment not found for id: " + id);
        }
        return result;
    }

    // find all
    @Query("SELECT c FROM Commentaire c JOIN FETCH c.livre JOIN FETCH c.adherent")
    List<Commentaire> findAllWithDetails();

    // find by livre id
    @Query("SELECT c FROM Commentaire c JOIN FETCH c.livre JOIN FETCH c.adherent WHERE c.livre.id = :id")
    List<Commentaire> findCommentairesByLivres(Long id);

}
