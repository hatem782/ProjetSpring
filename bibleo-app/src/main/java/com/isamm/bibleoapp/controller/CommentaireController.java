package com.isamm.bibleoapp.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.isamm.bibleoapp.Entity.Commentaire;
import com.isamm.bibleoapp.dao.CommentaireDao;
import com.isamm.bibleoapp.service.CommentaireService;

@RestController
@RequestMapping("/api/commentaire")
public class CommentaireController {

    @Autowired
    private CommentaireService commentaireService;


    //save
    @PostMapping("/create")
    public Commentaire saveCommentaire(@RequestBody Commentaire commentaire) {
        return commentaireService.saveCommentaire(commentaire);
    }
   
    //get All
    @GetMapping
    public List<Commentaire> getAllCommentaires() {
        return commentaireService.getAllCommentaires();
    }
    //get All pagination
    @GetMapping("/page")
    public Page<Commentaire> getAllCommentairesPage( @RequestParam(defaultValue = "0") int page,
    @RequestParam(defaultValue = "9") int size) {
        return commentaireService.getAllCommentairesPage(page, size) ;
    }

    //get by id 
    @GetMapping("/get/{id}")
    public Optional<Commentaire> getCommentaireById(@PathVariable Long id) {
        return commentaireService.getCommentaireById(id);
    }

    //update
    @PutMapping("/update/{id}")
    public Commentaire updateCommentaire(@PathVariable("id") Long id, @RequestBody Commentaire commentaire) {        
        return commentaireService.updateCommentaire(commentaire, id);
    }




    //delete
    @DeleteMapping("/delete/{id}")
    public String deleteCommentaire(@PathVariable Long id) {
        commentaireService.deleteCommentaire(id);
        return"Deleted Successfully";
    }


    //commentaire est signe 
     @PutMapping("/signal/{id}")
    public ResponseEntity<String> signalCommentaire(@PathVariable Long id, @RequestBody String raisonSign) {
        ResponseEntity<String> response = commentaireService.signalCommentaire(id,raisonSign);
        
        // You can add additional logic here if needed
        
        return response;
    }

}