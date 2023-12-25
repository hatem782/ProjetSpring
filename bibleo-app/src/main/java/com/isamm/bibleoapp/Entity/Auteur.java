package com.isamm.bibleoapp.Entity;

<<<<<<<HEAD=======

import java.util.ArrayList;>>>>>>>entity
import java.util.Date;
import java.util.List;

<<<<<<<HEAD=======
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

import jakarta.persistence.CascadeType;>>>>>>>entity
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;<<<<<<<HEAD=======
import jakarta.persistence.OneToMany;>>>>>>>entity
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Entity
@Table(name = "AUTEUR")
@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Table(name = "AUTEUR")
@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Auteur {

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private Long id;
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private Long id;

  private String nom;
  private String prenom;
  private Date dateNaiss;
  private String nationalite;
  private String nom;
  private String prenom;
  private Date dateNaiss;
  private String nationalite;

  @Enumerated(EnumType.STRING)
  private AuteurStatut auteurStatut;

  <<<<<<<HEAD
  // ################### CONSTUCTORS without livre ###################

  =======
  // @OneToMany(mappedBy = "auteur", cascade = CascadeType.ALL)
  // @JsonBackReference
  // private List<Livre> livres;

  // ################### CONSTUCTORS without livre ###################

  >>>>>>>entity

  public Auteur(String nom, String prenom, Date dateNaiss, String nationalite,
      AuteurStatut auteurStatut) {

    this.nom = nom;
    this.prenom = prenom;
    this.dateNaiss = dateNaiss;
    this.nationalite = nationalite;
    this.auteurStatut = auteurStatut;
<<<<<<< HEAD

  }

}=======
// this.livres = new ArrayList<Livre>();

}

}>>>>>>>entity
