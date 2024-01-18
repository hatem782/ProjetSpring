package com.isamm.bibleoapp.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.isamm.bibleoapp.Entity.Commentaire;
import com.isamm.bibleoapp.service.CommentaireService;
import com.mysql.cj.x.protobuf.MysqlxDatatypes.Scalar.String;

@RestController
@RequestMapping("/api/commentaire")
public class CommentaireController {

    @Autowired
    private CommentaireService commentaireService;

    // save
    @PostMapping("/create")
    @PreAuthorize("hasAuthority('USER')")
    public Commentaire saveCommentaire(@RequestBody Commentaire commentaire) {
        return commentaireService.saveCommentaire(commentaire);
    }

    // get All
    @GetMapping
    public List<Commentaire> getAllCommentaires() {
        return commentaireService.getAllCommentaires();
    }

    // get All pagination
    @GetMapping("/page")
    public Page<Commentaire> getAllCommentairesPage(@RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "9") int size) {
        return commentaireService.getAllCommentairesPage(page, size);
    }

    // get by id
    @GetMapping("/get/{id}")
    public Optional<Commentaire> getCommentaireById(@PathVariable Long id) {
        return commentaireService.getCommentaireById(id);
    }

    // get by livre id
    @GetMapping("/getByLivre/{id}")
    public List<Commentaire> getCommentaireByLivreId(@PathVariable Long id) {
        return commentaireService.findAllByLivreId(id);
    }

    // update
    @PutMapping("/update/{id}")
    @PreAuthorize("hasAuthority('USER')")
    public Commentaire updateCommentaire(@PathVariable("id") Long id, @RequestBody Commentaire commentaire) {
        return commentaireService.updateCommentaire(commentaire, id);
    }

    // delete
    @DeleteMapping("/delete/{id}")
    @PreAuthorize("hasAuthority('USER')")
    public java.lang.String deleteCommentaire(@PathVariable Long id) {
        commentaireService.deleteCommentaire(id);
        return "Deleted Successfully";
    }

    // commentaire est signe
    @PutMapping("/signal/{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<java.lang.String> signalCommentaire(@PathVariable Long id, @RequestBody String raisonSign) {
        ResponseEntity<java.lang.String> response = commentaireService.signalCommentaire(id, raisonSign);

        // You can add additional logic here if needed

        return response;
    }

}
