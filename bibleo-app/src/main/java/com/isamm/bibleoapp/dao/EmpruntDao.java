package com.isamm.bibleoapp.dao;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.isamm.bibleoapp.Entity.Emprunt;

public interface EmpruntDao extends JpaRepository<Emprunt, Long> {

    // FIND ALL EMPRUNTS WHERE ID ADHERANT IS ID
    @Query("SELECT e FROM Emprunt e WHERE e.adherent.id = :adherentId")
    Page<Emprunt> findAllByAdherentId(@Param("adherentId") Long adherentId, PageRequest pr);

    // FIND ALL EMPRUNTS WHERE ID LIVRE IS ID
    @Query("SELECT e FROM Emprunt e WHERE e.livre.id = :livreId")
    Page<Emprunt> findAllByLivreId(@Param("livreId") Long livreId, PageRequest pr);

    // FIND ALL EMPRUNTS WHERE AMENDE IS > 0
    @Query("SELECT e FROM Emprunt e WHERE e.amende > 0")
    Page<Emprunt> findAllWithAmende(PageRequest pr);

}
