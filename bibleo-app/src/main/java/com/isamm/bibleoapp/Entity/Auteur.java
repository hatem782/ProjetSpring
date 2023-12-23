package com.isamm.bibleoapp.Entity;



import java.util.Date;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name="AUTEUR")
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
public class Auteur {
    

 @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;


    private String nom;
    private String prenom;
    private Date dateNaiss;
    private String nationalite;


    @Enumerated(EnumType.STRING)
    private AuteurStatut auteurStatut;



    @ManyToOne
    @JoinColumn(name = "livre_id")
    @JsonBackReference
    private Livre livre;


  

     // ################### CONSTUCTORS ###################

     public Auteur() {
   
    }
    
    
    
    
    public Auteur(String nom, String prenom, Date dateNaiss, String nationalite, 
    AuteurStatut auteurStatut,Livre livre) {
   
      this.nom = nom;
      this.prenom = prenom;
      this.dateNaiss = dateNaiss;
      this.nationalite = nationalite;
      this.auteurStatut = auteurStatut;
      this.livre=livre;
    }
    
     // ################### CONSTUCTORS without livre ###################

     public Auteur(String nom, String prenom, Date dateNaiss, String nationalite, 
    AuteurStatut auteurStatut) {
   
      this.nom = nom;
      this.prenom = prenom;
      this.dateNaiss = dateNaiss;
      this.nationalite = nationalite;
      this.auteurStatut = auteurStatut;

    }
    

 // ################### GETTERS & SETTERS ###################


 
public String getNom() {
	return nom;
}

public Long getId() {
	return id;
}


public void setNom(String nom) {
	this.nom = nom;
}




public String getPrenom() {
	return prenom;
}




public void setPrenom(String prenom) {
	this.prenom = prenom;
}




public Date getDateNaiss() {
	return dateNaiss;
}




public void setDateNaiss(Date dateNaiss) {
	this.dateNaiss = dateNaiss;
}




public String getNationalite() {
	return nationalite;
}




public void setNationalite(String nationalite) {
	this.nationalite = nationalite;
}




public AuteurStatut getAuteurStatut() {
	return auteurStatut;
}




public void setAutheurStatut(AuteurStatut auteurStatut) {
	this.auteurStatut = auteurStatut;
}


  public Livre  getLivre() {
	return livre;
}

public void setLivre(Livre livre) {
	this.livre = livre;
}




  // ################### TO STRING ###################
  @Override
public String toString() {
	return "Auteur [nom=" + nom + ", prenom=" + prenom + ", nationalite=" + nationalite  +", livre="+livre+"]";
}




}