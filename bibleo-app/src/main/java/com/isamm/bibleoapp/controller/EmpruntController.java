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
import com.isamm.bibleoapp.dao.EmpruntDao;
import com.isamm.bibleoapp.dao.LivreDao;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/api/book")
@CrossOrigin("*")
public class EmpruntController {

    @Autowired
    private LivreDao livreDao;

    @Autowired
    private EmpruntDao EmpruntDao;

    // @GetMapping("/all")
    // public Page<Livre> getAllLivres(
    // @RequestParam(defaultValue = "0") int page,
    // @RequestParam(defaultValue = "9") int size) {
    // // i will return all the books
    // PageRequest pr = PageRequest.of(page, size);
    // Page<Livre> livres = EmpruntDao.findAll(pr);
    // return livres;
    // }

    // @GetMapping("/one/{id}")
    // public ResponseEntity<Livre> getLivreById(@PathVariable Long id) {
    // // here i will find book by id and i will return it if exist or i will return
    // // not found
    // Optional<Livre> livre = livreDao.findById(id);
    // return livre.map(ResponseEntity::ok).orElseGet(() ->
    // ResponseEntity.notFound().build());
    // }

    // @PostMapping("/create")
    // public ResponseEntity<Livre> createLivre(@RequestBody Livre livre) {
    // // here i will create a new book from the body request then i will return it
    // Livre createdLivre = livreDao.save(livre);
    // return ResponseEntity.status(HttpStatus.CREATED).body(createdLivre);
    // }

    // @PutMapping("/update/{id}")
    // public ResponseEntity<Livre> updateLivre(@PathVariable Long id, @RequestBody
    // Livre livre) {
    // // here i will update a book by id from the body request then i will return
    // it
    // Optional<Livre> livreData = livreDao.findById(id);
    // if (livreData.isPresent()) {
    // Livre updatedLivre = livreData.get();
    // updatedLivre.setTitre(livre.getTitre());
    // updatedLivre.setAuteur(livre.getAuteur());
    // updatedLivre.getGenre(livre.getGenre());
    // updatedLivre.setNbCopie(livre.getNbCopie());
    // updatedLivre.setNbPage(livre.getNbPage());
    // updatedLivre.setResume(livre.getResume());
    // updatedLivre.setStatut(livre.getStatut());
    // updatedLivre.setUrlImage(livre.getUrlImage());
    // updatedLivre.setUrlPdf(livre.getUrlPdf());
    // updatedLivre.setEmprunts(livre.getEmprunts());
    // return
    // ResponseEntity.status(HttpStatus.ACCEPTED).body(livreDao.save(updatedLivre));
    // } else {
    // return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    // }
    // }

    // @DeleteMapping("/delete/{id}")
    // public ResponseEntity<Livre> deleteLivre(@PathVariable Long id) {
    // // here i will delete a book by id
    // Optional<Livre> livreData = livreDao.findById(id);
    // if (livreData.isPresent()) {
    // livreDao.deleteById(id);
    // return ResponseEntity.status(HttpStatus.OK).build();
    // } else {
    // return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    // }
    // }
}
