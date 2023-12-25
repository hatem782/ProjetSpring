package com.isamm.bibleoapp.Entity;

import java.util.Date;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
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

  // ################### CONSTUCTORS without livre ###################

  public Auteur(String nom, String prenom, Date dateNaiss, String nationalite,
      AuteurStatut auteurStatut) {

    this.nom = nom;
    this.prenom = prenom;
    this.dateNaiss = dateNaiss;
    this.nationalite = nationalite;
    this.auteurStatut = auteurStatut;

  }

}