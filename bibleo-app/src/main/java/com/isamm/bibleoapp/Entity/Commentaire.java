package com.isamm.bibleoapp.Entity;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "COMMENTAIRE")
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
public class Commentaire {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String objet;
    private String contenu;
    private boolean estSignalé;
    private String raisonSign;

    @ManyToOne
    @JoinColumn(name = "livre_id")
    private Livre livre;

    @ManyToOne
    @JoinColumn(name = "adherent_id")
    private Adherant adherent;

    // ################### CONSTUCTORS ###################

    public Commentaire() {

    }

    public Commentaire(String objet, String contenu, boolean estSignalé, String raisonSign, Adherant adherent,
            Livre livre) {

        this.objet = objet;
        this.contenu = contenu;
        this.estSignalé = estSignalé;
        this.raisonSign = raisonSign;
        this.adherent = adherent;
        this.livre = livre;
    }

    // ################### GETTERS & SETTERS ###################

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Livre getLivre() {
        return livre;
    }

    public void setLivre(Livre livre) {
        this.livre = livre;
    }

    public String getObjet() {
        return objet;
    }

    public void setObjet(String objet) {
        this.objet = objet;
    }

    public String getContenu() {
        return contenu;
    }

    public void setContenu(String contenu) {
        this.contenu = contenu;
    }

    public boolean isEstSignalé() {
        return estSignalé;
    }

    public void setEstSignalé(boolean estSignalé) {
        this.estSignalé = estSignalé;
    }

    public String getRaisonSign() {
        return raisonSign;
    }

    public void setRaisonSign(String raisonSign) {
        this.raisonSign = raisonSign;
    }

    public void setAdherent(Adherant adherent) {
        this.adherent = adherent;
    }

    public Adherant getAdherent() {
        return adherent;
    }

    // ################### TO STRING ###################

    @Override
    public String toString() {
        return "Commentaire [objet=" + objet + ", contenu=" + contenu + ", estSignalé=" + estSignalé
                + ", raisonSign=" + raisonSign + ", adherent=" + adherent + "]";
    }

}
