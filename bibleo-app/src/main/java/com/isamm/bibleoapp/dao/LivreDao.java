package com.isamm.bibleoapp.dao;

import org.springframework.boot.autoconfigure.data.web.SpringDataWebProperties.Pageable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.isamm.bibleoapp.Entity.Livre;

public interface LivreDao extends JpaRepository<Livre, Long> {

    // find books by titles (and title not equals 'all') or authors (and author not
    // equals -1) or genres (and genre not equals 'all') with pagination
    @Query("SELECT l FROM Livre l JOIN FETCH l.auteur WHERE (:titre = 'All' OR l.titre LIKE %:titre%) AND (:auteur = -1 OR l.auteur.id = :auteur) AND (:genre = 'All' OR l.genre = :genre)")
    Page<Livre> findLivresByTitreAndAuteurAndGenre(String titre, Long auteur, String genre, PageRequest pr);
}
