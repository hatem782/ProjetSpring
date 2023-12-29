package com.isamm.bibleoapp.controller;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.data.web.SpringDataWebProperties.Pageable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.Query;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.isamm.bibleoapp.Entity.Adherant;
import com.isamm.bibleoapp.Entity.Emprunt;
import com.isamm.bibleoapp.Entity.Livre;
import com.isamm.bibleoapp.Entity.Statut;
import com.isamm.bibleoapp.dao.EmpruntDao;
import com.isamm.bibleoapp.dao.LivreDao;
import com.isamm.bibleoapp.dao.UserDao;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/api/emprunt")
public class EmpruntController {

    @Autowired
    private LivreDao livreDao;

    @Autowired
    private EmpruntDao EmpruntDao;

    @Autowired
    private UserDao userDao;

    // Create Emprunt - Adhrant
    @PostMapping("/create_demande_emprunt_book")
    public ResponseEntity<Emprunt> MakeDemandeEmprunt(@RequestBody Emprunt emprunt,
            @RequestParam Long id_user,
            @RequestParam Long id_book) {

        System.out.println("#################################################");
        System.out.println("emprunt : " + emprunt.toString());
        System.out.println("#################################################");

        // let's find the book by id
        Optional<Livre> livre = livreDao.findById(id_book);
        if (!livre.isPresent()) {
            System.out.println("#################################################");
            System.out.println("NO BOOK WITH THIS ID : " + id_book);
            System.out.println("#################################################");
            return ResponseEntity.notFound().build();
        }

        // let's find the user by id
        Optional<Adherant> adherant = userDao.findAdherantById(id_user);
        if (!adherant.isPresent()) {
            System.out.println("#################################################");
            System.out.println("NO USER WITH THIS ID : " + id_user);
            System.out.println("#################################################");
            return ResponseEntity.notFound().build();
        }

        // let's create the emprunt
        emprunt.setLivre(livre.get());
        emprunt.setAdherent(adherant.get());
        emprunt.setAmendeParJour(1);
        // here we set the amende to 0
        emprunt.setAmende(0);
        // here we created a request for emprunt
        emprunt.setStatut(Statut.EnAttente);

        System.out.println("#################################################");
        System.out.println("emprunt : " + emprunt.toString());
        System.out.println("#################################################");

        System.out.println("################### AMAN E5DEM ###################");
        Emprunt createdEmprunt = EmpruntDao.save(emprunt);

        return ResponseEntity.status(HttpStatus.CREATED).body(createdEmprunt);

    }

    // Refuse Demand - Admin
    @PutMapping("/refuse_demande_emprunt_book/{id}")
    public ResponseEntity<Emprunt> RefuseDemandeEmprunt(@PathVariable Long id) {

        // let's find the emprunt by id
        Optional<Emprunt> emprunt = EmpruntDao.findById(id);
        if (!emprunt.isPresent()) {
            System.out.println("#################################################");
            System.out.println("NO EMRUNT WITH THIS ID : " + id);
            System.out.println("#################################################");
            return ResponseEntity.notFound().build();
        }

        // let's check if the emprunt is in en attente status or not
        if (emprunt.get().getStatut() != Statut.EnAttente) {
            System.out.println("#################################################");
            System.out.println("EMPRUNT IS NOT IN EN ATTENTE STATUS");
            System.out.println("#################################################");
            return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).build();
        }

        // here we set the statut to refused
        emprunt.get().setStatut(Statut.Refusé);

        // here we update the emprunt
        Emprunt updatedEmprunt = EmpruntDao.save(emprunt.get());

        return ResponseEntity.status(HttpStatus.CREATED).body(updatedEmprunt);
    }

    // Accept Demand - Admin
    // Accept Demand - Admin (tensach tna9s ktob )
    @PutMapping("/accept_demande_emprunt_book/{id}")
    public ResponseEntity<Emprunt> AcceptDemandeEmprunt(@PathVariable Long id) {

        // let's find the emprunt by id
        Optional<Emprunt> emprunt = EmpruntDao.findById(id);
        if (!emprunt.isPresent()) {
            System.out.println("#################################################");
            System.out.println("NO EMRUNT WITH THIS ID : " + id);
            System.out.println("#################################################");
            return ResponseEntity.notFound().build();
        }

        // let's check if the emprunt is in en attente status or not
        if (emprunt.get().getStatut() != Statut.EnAttente) {
            System.out.println("#################################################");
            System.out.println("EMPRUNT IS NOT IN EN ATTENTE STATUS");
            System.out.println("#################################################");
            return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).build();
        }

        // let's check the number of copies available ot not
        if (emprunt.get().getLivre().getQuantite() < emprunt.get().getNbCopie()) {
            System.out.println("#################################################");
            System.out.println("NO ENOUGH COPIES FOR THIS BOOK : " + emprunt.get().getLivre().getTitre());
            System.out.println("#################################################");
            return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).build();
        }

        // here we set the statut to Emprunté
        emprunt.get().setStatut(Statut.Emprunté);

        // here we update the emprunt
        Emprunt updatedEmprunt = EmpruntDao.save(emprunt.get());

        // here we update the number of copies in livre
        Livre livre = emprunt.get().getLivre();
        livre.setQuantite(livre.getQuantite() - emprunt.get().getNbCopie());
        livreDao.save(livre);

        return ResponseEntity.status(HttpStatus.CREATED).body(updatedEmprunt);
    }

    // Finish Emprunt - User (tensach tzyd ktob)
    @PutMapping("/finish_demande_emprunt_book/{id}")
    public ResponseEntity<Emprunt> FinishEmprunt(@PathVariable Long id) {

        // let's find the emprunt by id
        Optional<Emprunt> emprunt = EmpruntDao.findById(id);
        if (!emprunt.isPresent()) {
            System.out.println("#################################################");
            System.out.println("NO EMRUNT WITH THIS ID : " + id);
            System.out.println("#################################################");
            return ResponseEntity.notFound().build();
        }

        // let's check if the emprunt is in en Emprunté status or not
        if (emprunt.get().getStatut() != Statut.Emprunté) {
            System.out.println("#################################################");
            System.out.println("EMPRUNT IS NOT IN Emprunté STATUS");
            System.out.println("#################################################");
            return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).build();
        }

        // ETWBU = Emprunt That Will Be Updated
        Emprunt ETWBU = emprunt.get();

        Date date_end = (Date) emprunt.get().getDateFin();
        Date date_retour = new Date(System.currentTimeMillis());
        // let's compare the date of end and the date of return
        if (date_retour.after(date_end)) {
            System.out.println("#################################################");
            System.out.println("YOU HAVE AN AMENDE");
            System.out.println("#################################################");
            // here we calculate the amende
            // 1 : we get difference in milliseconds between the two dates
            long diff = date_retour.getTime() - date_end.getTime();
            // 2 : we calculate the number of days
            int diffDays = (int) (diff / (24 * 60 * 60 * 1000));
            // 3 : we calculate the amende
            float amende = diffDays * ETWBU.getAmendeParJour();
            // 4 : we set the amende
            ETWBU.setAmende((int) amende);
            ETWBU.setStatut(Statut.Retard);

        } else {
            // Adherant didn't return books late => no amande + Normal Returned Status
            ETWBU.setStatut(Statut.Retourné);
        }

        // here we finish the Emprunt by adding the real date of return
        ETWBU.setDateRetour(date_retour);
        // we update the emprunt
        Emprunt updatedEmprunt = EmpruntDao.save(ETWBU);

        // here the Adherant returned Books , so we add the Quantity
        Livre livre = ETWBU.getLivre();
        livre.setQuantite(livre.getQuantite() + ETWBU.getNbCopie());
        livreDao.save(livre);

        return ResponseEntity.status(HttpStatus.CREATED).body(updatedEmprunt);
    }

    // 5ales 5teytou
    @PutMapping("/payed-amandes/{id}")
    public ResponseEntity<Emprunt> PayedAmandeOFEmprunt(@PathVariable Long id) {

        // let's find the emprunt by id
        Optional<Emprunt> emprunt = EmpruntDao.findById(id);
        if (!emprunt.isPresent()) {
            System.out.println("#################################################");
            System.out.println("NO EMRUNT WITH THIS ID : " + id);
            System.out.println("#################################################");
            return ResponseEntity.notFound().build();
        }

        // let's check if the emprunt is in en Retard status or not
        if (emprunt.get().getStatut() != Statut.Retard) {
            System.out.println("#################################################");
            System.out.println("EMPRUNT IS NOT IN Retard STATUS");
            System.out.println("#################################################");
            return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).build();
        }

        Emprunt ETWBU = emprunt.get();
        // let's reset the amandes of this emprunt
        ETWBU.setAmende(0);

        // let's save the emprunt
        Emprunt updatedEmprunt = EmpruntDao.save(ETWBU);

        return ResponseEntity.status(HttpStatus.CREATED).body(updatedEmprunt);
    }

    @GetMapping("/get-emprunts-by-adherant-id/{my_id}")
    public Page<Emprunt> getEmpruntsByAdherantId(@PathVariable Long my_id,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "9") int size) {

        PageRequest pr = PageRequest.of(page, size);
        Page<Emprunt> emprunts = EmpruntDao.findAllByAdherentId(my_id, pr);
        return emprunts;
    }

    @GetMapping("/get-emprunts-by-livre-id/{my_id}")
    public Page<Emprunt> getEmpruntsByLivreId(@PathVariable Long my_id,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "9") int size) {

        PageRequest pr = PageRequest.of(page, size);
        Page<Emprunt> emprunts = EmpruntDao.findAllByLivreId(my_id, pr);
        return emprunts;
    }

    // Get Emprunt By Id - Admin
    @GetMapping("/get-all-emprunts") //
    public Page<Emprunt> getAllEmprunts(@RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {

        PageRequest pr = PageRequest.of(page, size);
        Page<Emprunt> emprunts = EmpruntDao.findAll(pr);
        return emprunts;
    }

    // Get 5teya Emprunt
    @GetMapping("/get-5teya-emprunts") //
    public Page<Emprunt> get5teyaEmprunts(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {

        PageRequest pr = PageRequest.of(page, size);
        Page<Emprunt> emprunts = EmpruntDao.findAllWithAmende(pr);
        return emprunts;
    }

    @GetMapping("/get-en-attente-emprunts") //
    public Page<Emprunt> getEnAttenteEmprunts(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        PageRequest pr = PageRequest.of(page, size);
        Page<Emprunt> emprunts = EmpruntDao.findAllEnAttente(pr);
        return emprunts;
    }

    @GetMapping("/get-refuse-emprunts") //
    public Page<Emprunt> getRefuseEmprunts(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        PageRequest pr = PageRequest.of(page, size);
        Page<Emprunt> emprunts = EmpruntDao.findAllRefuse(pr);
        return emprunts;
    }

    @GetMapping("/get-retourne-emprunts") //
    public Page<Emprunt> getRetourneEmprunts(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        PageRequest pr = PageRequest.of(page, size);
        Page<Emprunt> emprunts = EmpruntDao.findAllRetourne(pr);
        return emprunts;
    }

    @GetMapping("/get-emprunte-emprunts")
    public Page<Emprunt> getEmprunteEmprunts(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        PageRequest pr = PageRequest.of(page, size);
        Page<Emprunt> emprunts = EmpruntDao.findAllEmprunte(pr);
        return emprunts;
    }

    @GetMapping("/get-retards-emprunts")
    public Page<Emprunt> getRerardEmprunts(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        PageRequest pr = PageRequest.of(page, size);
        Page<Emprunt> emprunts = EmpruntDao.findAllRetard(pr);
        return emprunts;
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Livre> DeleteEmprunt(@PathVariable Long id) {

        // let's find the emprunt by id
        Optional<Emprunt> emprunt = EmpruntDao.findById(id);
        if (!emprunt.isPresent()) {
            System.out.println("#################################################");
            System.out.println("NO EMRUNT WITH THIS ID : " + id);
            System.out.println("#################################################");
            return ResponseEntity.notFound().build();
        }

        // 2 : i will return the books quantity
        Livre livre = emprunt.get().getLivre();
        livre.setQuantite(livre.getQuantite() + emprunt.get().getNbCopie());
        livreDao.save(livre);

        // 3 : i will delete the emprunt
        EmpruntDao.deleteById(id);

        return ResponseEntity.status(HttpStatus.OK).build();
    }

}
