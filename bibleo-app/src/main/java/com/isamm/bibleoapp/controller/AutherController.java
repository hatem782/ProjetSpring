package com.isamm.bibleoapp.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.isamm.bibleoapp.Entity.Auteur;
import com.isamm.bibleoapp.dao.AuteurDao;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/api/auther")
public class AutherController {

    @Autowired
    private AuteurDao auteurDao;

    @GetMapping("/all")
    @PreAuthorize("hasAuthority('ADMIN')")
    public Page<Auteur> getAllAuteurs(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "9") int size) {
        // i will return all the authers
        PageRequest pr = PageRequest.of(page, size);
        Page<Auteur> auteurs = auteurDao.findAll(pr);
        return auteurs;
    }

    @GetMapping("/all-all")
    public List<Auteur> getAllAuteurs() {
        // i will return all the authers
        List<Auteur> auteurs = auteurDao.findAll();
        return auteurs;
    }

    @GetMapping("/one/{id}")
    public ResponseEntity<Auteur> getAuteurById(@PathVariable Long id) {
        // here i will find auther by id and i will return it if exist or i will return
        // not found
        Optional<Auteur> auteur = auteurDao.findById(id);
        return auteur.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping("/create")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<Auteur> createAuteur(@RequestBody Auteur auteur) {
        // here i will create a new auther from the body request then i will return it
        Auteur createdAuteur = auteurDao.save(auteur);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdAuteur);
    }

    @PutMapping("/update/{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<Auteur> updateAuteur(@RequestBody Auteur auteur, @PathVariable Long id) {
        System.out.println(auteur.toString());
        // 1 : i will check if the auther exist or not
        if (!auteurDao.findById(id).isPresent()) {
            return ResponseEntity.notFound().build();
        }
        // 2 : i will update the auther
        auteur.setId(id);
        Auteur updatedAuteur = auteurDao.save(auteur);

        // 3 : i will return the updated auther
        return ResponseEntity.status(HttpStatus.OK).body(updatedAuteur);
    }

    @DeleteMapping("/delete/{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<Auteur> deleteAuteur(@PathVariable Long id) {
        // 1 : i will check if the auther exist or not
        if (!auteurDao.findById(id).isPresent()) {
            return ResponseEntity.notFound().build();
        }
        // 2 : i will delete the auther
        auteurDao.deleteById(id);

        // 3 : i will return the deleted auther
        return ResponseEntity.status(HttpStatus.OK).build();
    }

}
