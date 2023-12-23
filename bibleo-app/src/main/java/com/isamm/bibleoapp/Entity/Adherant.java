package com.isamm.bibleoapp.Entity;

import java.util.Date;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "ADHERANT")
public class Adherant extends User {

  private Date AbonnementExpireDate;

  @OneToMany(mappedBy = "adherent", cascade = CascadeType.ALL)
  private List<Emprunt> emprunts;

  @OneToMany(mappedBy = "adherent", cascade = CascadeType.ALL)
  private List<Review> reviews;

  @OneToMany(mappedBy = "adherent", cascade = CascadeType.ALL)
  private List<Commentaire> commentaires;

  // ################### CONSTUCTORS ###################
  public Adherant() {
  }

  public Adherant(String fullname, String email, String password, String phone, String address, Date birthday,
      Role role, Date AbonnementExpireDate,
      List<Commentaire> commentaires,
      List<Review> reviews, List<Emprunt> emprunts) {
    super(fullname, email, password, phone, address, birthday, role);
    this.AbonnementExpireDate = AbonnementExpireDate;
    this.commentaires = commentaires;
    this.reviews = reviews;
    this.emprunts = emprunts;
  }
  // ################### CONSTUCTORS without commentaire,review,emprunt
  // ###################

  public Adherant(String fullname, String email, String password, String phone, String address, Date birthday,
      Role role, Date AbonnementExpireDate) {
    super(fullname, email, password, phone, address, birthday, role);
    this.AbonnementExpireDate = AbonnementExpireDate;

  }

  // ################### GETTERS & SETTERS###################

  public Date getAbonnementExpireDate() {
    return AbonnementExpireDate;
  }

  public void setAbonnementExpireDate(Date AbonnementExpireDate) {
    this.AbonnementExpireDate = AbonnementExpireDate;
  }

  public List<Emprunt> getEmprunts() {
    return emprunts;
  }

  public List<Review> getReviews() {
    return reviews;
  }

  public List<Commentaire> getCommentaires() {
    return commentaires;
  }

  public void setEmprunts(List<Emprunt> emprunts) {
    this.emprunts = emprunts;
  }

  public void setReviews(List<Review> reviews) {
    this.reviews = reviews;
  }

  public void setCommentaires(List<Commentaire> commentaires) {
    this.commentaires = commentaires;
  }

  // ################### TO STRING ###################

  @Override
  public String toString() {
    return "Admin{" +
        super.toString() +
        ", AbonnementExpireDate=" + AbonnementExpireDate
        + ", commentaires=" + commentaires.toString() +
        ", reviews=" + reviews.toString() +
        ", emprunts=" + emprunts.toString() +
        '}';
  }
}
