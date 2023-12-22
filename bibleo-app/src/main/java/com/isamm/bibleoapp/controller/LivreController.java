package com.isamm.bibleoapp.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.data.web.SpringDataWebProperties.Pageable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.isamm.bibleoapp.Entity.Livre;
import com.isamm.bibleoapp.dao.LivreDao;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/api/book")
@CrossOrigin("*")
public class LivreController {

    @Autowired
    private LivreDao livreDao;

    @GetMapping("/all")
    public Page<Livre> getAllLivres(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "9") int size) {
        // i will return all the livres
        PageRequest pr = PageRequest.of(page, size);
        Page<Livre> livres = livreDao.findAll(pr);
        return livres;

    }

    @GetMapping("/one/{id}")
    public ResponseEntity<Livre> getLivreById(@PathVariable Long id) {
        // here i will find livre by id and i will return it if exist or i will return
        // not found
        Optional<Livre> livre = livreDao.findById(id);
        return livre.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping("/create")
    public ResponseEntity<Livre> createLivre(@RequestBody Livre livre) {
        // here i will create a new livre from the body request then i will return it
        Livre createdLivre = livreDao.save(livre);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdLivre);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<Livre> updateLivre(@RequestBody Livre livre, @PathVariable Long id) {
        System.out.println(livre.toString());
        // 1 : i will check if the livre exist or not
        if (!livreDao.findById(id).isPresent()) {
            return ResponseEntity.notFound().build();
        }
        // 2 : i will update the livre
        livre.setId(id);
        Livre updatedLivre = livreDao.save(livre);

        // 3 : i will return the updated livre
        return ResponseEntity.status(HttpStatus.OK).body(updatedLivre);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Livre> deleteLivre(@PathVariable Long id) {
        // 1 : i will check if the livre exist or not
        if (!livreDao.findById(id).isPresent()) {
            return ResponseEntity.notFound().build();
        }
        // 2 : i will delete the livre
        livreDao.deleteById(id);

        // 3 : i will return the deleted livre
        return ResponseEntity.status(HttpStatus.OK).build();
    }
}
