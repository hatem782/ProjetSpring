package com.isamm.bibleoapp.Entity;

import java.util.Date;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Entity
@Table(name = "ADHERANT")
@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Adherant extends User {

  private Date AbonnementExpireDate;

  // @OneToMany(mappedBy = "adherent", cascade = CascadeType.ALL)
  // private List<Emprunt> emprunts;

  // @OneToMany(mappedBy = "adherent", cascade = CascadeType.ALL)
  // private List<Review> reviews;

  // @OneToMany(mappedBy = "adherent", cascade = CascadeType.ALL)
  // private List<Commentaire> commentaires;

  // ################### CONSTUCTORS ###################

  public Adherant(String fullname, String email, String password, String phone, String address, Date birthday,
      Role role, Date AbonnementExpireDate) {
    super(fullname, email, password, phone, address, birthday, role);
    this.AbonnementExpireDate = AbonnementExpireDate;

  }

}
