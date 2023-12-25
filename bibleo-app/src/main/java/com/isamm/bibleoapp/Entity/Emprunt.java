package com.isamm.bibleoapp.Entity;

import java.util.Date;

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
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Entity
@Table(name = "EMPRUNT")
@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Emprunt {

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private Long id;

  private Date dateDebut;
  private Date dateFin;
  private Date dateRetour;
  private int nbCopie;
  private float amendeParJour;
  private int amende;

  @Enumerated(EnumType.STRING)
  private Statut statut;

  @ManyToOne
  @JoinColumn(name = "livre_id")
  private Livre livre;

  @ManyToOne
  @JoinColumn(name = "adherent_id")
  private Adherant adherent;

  // ################### CONSTUCTORS ###################

  public Emprunt(Date dateDebut, Date dateFin, Date dateRetour, int nbCopie, float amendeParJour, int amende,
      Statut statut, Livre livre, Adherant adherent) {

    this.dateDebut = dateDebut;
    this.dateFin = dateFin;
    this.dateRetour = dateRetour;
    this.nbCopie = nbCopie;
    this.amendeParJour = amendeParJour;
    this.amende = amende;
    this.statut = statut;
    this.livre = livre;
    this.adherent = adherent;
  }

}
