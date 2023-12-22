package com.isamm.bibleoapp.service;


import java.util.List;
import java.util.Objects;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
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

   
     //update comm
     public Commentaire updateCommentaire(Commentaire commentaire,Long id) {
        Commentaire cmmbd= commentaireDao.findById(id).get();
        //objet
         if (Objects.nonNull(commentaire.getObjet()) && !"".equalsIgnoreCase(commentaire.getObjet())) {
            cmmbd.setContenu(commentaire.getObjet());
        }
        //contenu
        if (Objects.nonNull(commentaire.getContenu()) && !"".equalsIgnoreCase(commentaire.getContenu())) {
            cmmbd.setContenu(commentaire.getContenu());
        }
        //raison sign
         if (Objects.nonNull(commentaire.getRaisonSign()) && !"".equalsIgnoreCase(commentaire.getRaisonSign())) {
            cmmbd.setContenu(commentaire.getRaisonSign());
        }
        //est signalé boolean
        if (Objects.nonNull(commentaire.isEstSignalé())) {
            cmmbd.setEstSignalé(commentaire.isEstSignalé());
        }
        
        return commentaireDao.save(commentaire);
    }

    //delete comm
    public void deleteCommentaire(Long id) {
        commentaireDao.deleteById(id);
    }
}
