package com.isamm.bibleoapp.Entity;

import java.util.Date;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "LIVRE")
public class Livre {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String titre;
    private Date anneePub;
    private String isbn;
    private String description;
    private int quantite;
    private float amendeParJour;
    private String imageUri;
    private String genre;
    @Enumerated(EnumType.STRING)
    private Langue langue;

    @OneToMany(mappedBy = "livre")
    private List<Commentaire> commentaires;

    @OneToMany(mappedBy = "livre")
    private List<Review> reviews;

    @OneToMany(mappedBy = "livre")
    private List<Emprunt> emprunts;

    @ManyToOne
    private Auteur auteur;

    // ################### CONSTUCTORS ###################
    public Livre() {
    }

    public Livre(String titre, Date anneePub, String isbn, String description, int quantite, float amendeParJour,
            String imageUri, String genre, Langue langue,
            List<Commentaire> commentaires,
            List<Review> reviews, List<Emprunt> emprunts, Auteur auteur) {
        this.titre = titre;
        this.anneePub = anneePub;
        this.isbn = isbn;
        this.description = description;
        this.quantite = quantite;
        this.amendeParJour = amendeParJour;
        this.imageUri = imageUri;
        this.genre = genre;
        this.langue = langue;
        this.commentaires = commentaires;
        this.reviews = reviews;
        this.emprunts = emprunts;
        this.auteur = auteur;
    }

    // ################### CONSTUCTORS without reviews,
    // commentaires,emprunts ###################

    public Livre(String titre, Date anneePub, String isbn, String description, int quantite, float amendeParJour,
            String imageUri, String genre, Langue langue, Auteur auteur) {
        this.titre = titre;
        this.anneePub = anneePub;
        this.isbn = isbn;

        this.description = description;
        this.quantite = quantite;
        this.amendeParJour = amendeParJour;
        this.imageUri = imageUri;
        this.genre = genre;
        this.langue = langue;
        this.auteur = auteur;

    }

    // ################### GETTERS ###################

    public Long getId() {
        return id;
    }

    public String getTitre() {
        return titre;
    }

    public Langue getLangue() {
        return langue;
    }

    public String getDescription() {
        return description;
    }

    public Date getAnneePub() {
        return anneePub;
    }

    public String getIsbn() {
        return isbn;
    }

    public int getQuantite() {
        return quantite;
    }

    public float getAmendeParJour() {
        return amendeParJour;
    }

    public String getImageUri() {
        return imageUri;
    }

    public String getGenre() {
        return genre;
    }

    public List<Commentaire> getCommentaires() {
        return commentaires;
    }

    public List<Review> getReviews() {
        return reviews;
    }

    public List<Emprunt> getEmprunts() {
        return emprunts;
    }

    public Auteur getAuteur() {
        return auteur;
    }

    // ################### SETTERS ###################

    public void setId(Long id) {
        this.id = id;
    }

    public void setLangue(Langue langue) {
        this.langue = langue;
    }

    public void setTitre(String titre) {
        this.titre = titre;
    }

    public void setAnneePub(Date anneePub) {
        this.anneePub = anneePub;
    }

    public void setIsbn(String isbn) {
        this.isbn = isbn;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setCommentaires(List<Commentaire> commentaires) {
        this.commentaires = commentaires;
    }

    public void setReviews(List<Review> reviews) {
        this.reviews = reviews;
    }

    public void setEmprunts(List<Emprunt> emprunts) {
        this.emprunts = emprunts;
    }

    public void setAuteur(Auteur auteur) {
        this.auteur = auteur;
    }

    public void setQuantite(int quantite) {
        this.quantite = quantite;
    }

    public void setAmendeParJour(float amendeParJour) {
        this.amendeParJour = amendeParJour;
    }

    public void setImageUri(String imageUri) {
        this.imageUri = imageUri;
    }

    public void setGenre(String genre) {
        this.genre = genre;
    }

    // ################### TO STRING ###################

    @Override
    public String toString() {
        return "Livre [id=" + id + ", titre=" + titre + ", anneePub=" + anneePub + ", isbn=" + isbn + ", description="
                + description + ", quantite=" + quantite + ", amendeParJour=" + amendeParJour + ", imageUri=" + imageUri
                + ", genre=" + genre + "]" + ", commentaires=" + commentaires +
                ", reviews=" + reviews +
                ", emprunts=" + emprunts +
                ", auteur=" + auteur;
    }
}
