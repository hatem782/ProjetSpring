package com.isamm.bibleoapp.Entity;

import java.util.Date;

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
@Table(name="EMPRUNT")
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

     public Emprunt() {
   
    }
    
    public Emprunt(Date dateDebut, Date dateFin, Date dateRetour, int nbCopie, float amendeParJour, int amende,
        Statut statut,Livre livre,Adherant adherent) {
    
      this.dateDebut = dateDebut;
      this.dateFin = dateFin;
      this.dateRetour = dateRetour;
      this.nbCopie = nbCopie;
      this.amendeParJour = amendeParJour;
      this.amende = amende;
      this.statut = statut;
      this.livre=livre;
      this.adherent=adherent;
    }
    
    




  // ################### GETTERS & SETTERS ###################


  public Date getDateDebut() {
    return dateDebut;
  }
   public void setAdherent(Adherant adherent) {
     this.adherent=adherent;
  }
  public Adherant getAdherent() {
    return adherent;
  }
  public void setDateDebut(Date dateDebut) {
    this.dateDebut = dateDebut;
  }
  
  public Date getDateFin() {
    return dateFin;
  }
  
  public void setDateFin(Date dateFin) {
    this.dateFin = dateFin;
  }
  
  public Date getDateRetour() {
    return dateRetour;
  }
  
  public void setDateRetour(Date dateRetour) {
    this.dateRetour = dateRetour;
  }
  
  public int getNbCopie() {
    return nbCopie;
  }
  
  public void setNbCopie(int nbCopie) {
    this.nbCopie = nbCopie;
  }
  
  public float getAmendeParJour() {
    return amendeParJour;
  }
  
  public void setAmendeParJour(float amendeParJour) {
    this.amendeParJour = amendeParJour;
  }
  
  public int getAmende() {
    return amende;
  }
  
  public void setAmende(int amende) {
    this.amende = amende;
  }
  
  public Statut getStatut() {
    return statut;
  }
  
  public void setStatut(Statut statut) {
    this.statut = statut;
  }
  
  
  public Livre getLivre() {
    return livre;
  }
  
  public void setLivre(Livre livre) {
    this.livre = livre;
  }
  



  // ################### TO STRING ###################


  @Override
public String toString() {
	return "Emprunt [nbCopie=" + nbCopie + ", amendeParJour=" + amendeParJour + ", amende=" + amende + ", statut="
			+ statut +", livre="+livre+", adherent="+adherent+"]";
}


}
