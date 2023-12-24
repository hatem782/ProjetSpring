package com.isamm.bibleoapp.service;


import java.util.List;
import java.util.Objects;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;

import com.isamm.bibleoapp.Entity.Commentaire;
import com.isamm.bibleoapp.dao.CommentaireDao;

@Service
public class CommentaireService {

    @Autowired
    private CommentaireDao commentaireDao;

    //save commentaire
    public Commentaire saveCommentaire(Commentaire commentaire) {
        return commentaireDao.save(commentaire);
    }

    //get  comm by id
     public Optional<Commentaire> getCommentaireById(Long id) {
        return commentaireDao.findById(id);
    }

     //get al comm
    public List<Commentaire> getAllCommentaires() {
        return commentaireDao.findAll();
    }



     //get All pagination
 
    public Page<Commentaire> getAllCommentairesPage( @RequestParam(defaultValue = "0") int page,
    @RequestParam(defaultValue = "9") int size) {
        PageRequest pr = PageRequest.of(page, size);
        Page<Commentaire> commentaires = commentaireDao.findAll(pr);
        return commentaires ;
    }
   
     //update comm
public Commentaire updateCommentaire(Commentaire commentaire, Long id) {
    Commentaire cmmbd = commentaireDao.findById(id).orElseThrow(() -> new RuntimeException("Commentaire not found"));

    // Update fields only if they are not null in the incoming data
    if (Objects.nonNull(commentaire.getObjet())) {
        cmmbd.setObjet(commentaire.getObjet());
    }

    if (Objects.nonNull(commentaire.getContenu())) {
        cmmbd.setContenu(commentaire.getContenu());
    }

    if (Objects.nonNull(commentaire.getRaisonSign())) {
        cmmbd.setRaisonSign(commentaire.getRaisonSign());
    }

    if (Objects.nonNull(commentaire.isEstSignale())) {
        cmmbd.setEstSignale(commentaire.isEstSignale());
    }

    // Update livre and adherent only if they are not null in the incoming data
    if (Objects.nonNull(commentaire.getLivre())) {
        cmmbd.setLivre(commentaire.getLivre());
    }

    if (Objects.nonNull(commentaire.getAdherent())) {
        cmmbd.setAdherent(commentaire.getAdherent());
    }

    // Save the changes to the existing entity
    return commentaireDao.save(cmmbd);
}

    //delete comm
    public void deleteCommentaire(Long id) {
        commentaireDao.deleteById(id);
    }
}
