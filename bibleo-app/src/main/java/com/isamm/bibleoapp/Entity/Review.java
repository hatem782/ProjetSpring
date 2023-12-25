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
@Table(name = "REVIEW")
public class Review {

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private Long id;

  private Long Rate;

  @ManyToOne
  @JoinColumn(name = "livre_id")
  private Livre livre;

  @ManyToOne
  @JoinColumn(name = "adherent_id")
  private Adherant adherent;

  // ################### CONSTUCTORS ###################

  public Review() {
    super();
  }

  public Review(Long rate, Livre livre, Adherant adherent) {
    super();
    Rate = rate;
    this.livre = livre;
    this.adherent = adherent;
  }

  // ################### GETTERS & SETTERS ###################

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public Long getRate() {
    return Rate;
  }

  public void setRate(Long rate) {
    Rate = rate;
  }

  public Livre getLivre() {
    return livre;
  }

  public void setLivre(Livre livre) {
    this.livre = livre;
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
    return "Review [Rate=" + Rate + ", livre=" + livre + ", adherent=" + adherent + "]";
  }

}
