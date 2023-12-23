package com.isamm.bibleoapp.Entity;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;

@Entity
@DiscriminatorValue("Adm")
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
public class Admin extends User{

  private Float salary;
  private Date hireDate;



    
     // ################### CONSTUCTORS ###################

     public Admin() {
    }

    public Admin(String fullname, String email, String password, String phone, String address, Date birthday, Role role, Float salary, Date hireDate) {
        super( fullname,  email,  password,  phone,  address,  birthday,  role);
        this.salary = salary;
        this.hireDate = hireDate;
    }




  // ################### GETTERS & SETTERS ###################
  public Float getSalary() {
    return salary;
}

public void setSalary(Float salary) {
    this.salary = salary;
}

public Date getHireDate() {
    return hireDate;
}

public void setHireDate(Date hireDate) {
    this.hireDate = hireDate;
}








  // ################### TO STRING ###################

  @Override
  public String toString() {
      return "Admin{" +
              super.toString() +
              ", salary=" + salary +
              ", hireDate=" + hireDate +
              '}';
  }
}
