package com.isamm.bibleoapp.Entity;

import java.util.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;


@Entity
@Table(name="USERS")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    
    @Column(nullable = false)
    private String fullname;

    @Column(unique = true, nullable = false)
    private String email;

    @Column(nullable = false)
    private String password;

    private String phone;
    private String address;
    private Date birthday;

    @ManyToOne
    @JoinColumn(name = "role_id")
    private Role role;




    // ################### CONSTUCTORS ###################
    public User() {
    }

  // TO MAKE USER
      public User(String fullname, String email, String password, String phone, String address, Date birthday, Role role) {
        this.fullname = fullname;
        this.email = email;
        this.password = password;
        this.phone = phone;
        this.address = address;
        this.birthday = birthday;
        this.role = role;
     
    }



    // ################### GETTERS ###################
    public Long getId() {
        return id;
    }

    public String getFullname() {
        return fullname;
    }

    public String getEmail() {
        return email;
    }

    public String getPassword() { 
        return password;
    }

    public String getPhone() {
        return phone;
    }

    public String getAddress() {
        return address;
    }

    public Date getBirthday() {
        return birthday;
    }

    public Role getRole() {
        return role;
    }


    // ################### SETTERS ###################

    public void setId(Long id) {
        this.id = id;
    }

    public void setFullname(String fullname) {
        this.fullname = fullname;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setPassword(String password) { 
        this.password = password;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public void setAddress(String address) {
        this.address= address;
    }

    public void setBirthday(Date birthday) {
        this.birthday = birthday;
    }

    public void setRole(Role role) {
        this.role = role;
    }



    // ################### TO STRING ###################

    
    @Override
    public String toString() {
        return "User [address=" + this.address + 
        ", birthday=" + this.birthday + 
        ", email=" + this.email + 
        ", fullname=" + this.fullname+ 
        ", id=" + this.id + 
        ", password=" + this.password + 
        ", phone=" + this.phone + 
        ", role=" + role.toString() +
        "]";
    }

}
