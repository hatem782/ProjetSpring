package com.isamm.bibleoapp.Entity;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
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

    // @OneToMany(mappedBy = "livre")
    // private List<Commentaire> commentaires;

    // @OneToMany(mappedBy = "livre")
    // private List<Review> reviews;

    // @OneToMany(mappedBy = "livre")
    // private List<Emprunt> emprunts;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "author_id")
    // @JsonManagedReference
    private Auteur auteur;

    // ################### CONSTUCTORS ###################

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
        // this.commentaires = new ArrayList<Commentaire>();
        // this.reviews = new ArrayList<Review>();
        // this.emprunts = new ArrayList<Emprunt>();

    }

}