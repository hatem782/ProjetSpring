package com.isamm.bibleoapp.Entity;

import java.sql.Date;

public class Admin extends User {
    private Float salary;




    // ################### CONSTUCTORS ###################
    public Admin() {
        super();
    }

    public Admin(String fullname, String email, String password, String phone, String address, Date birthday, Float salary, Role role) {
        super(fullname, email, password, phone, address, birthday, role);
        this.salary = salary;
    }

    // ################### GETTERS ###################
    public Float getSalary() {
        return salary;
    }

    // ################### SETTERS ###################
    public void setSalary(Float salary) {
        this.salary = salary;
    }

    // ################### TO STRING ###################
    @Override
    public String toString() {
        return super.toString() + "Admin [salary=" + salary + "]";
    }

}
