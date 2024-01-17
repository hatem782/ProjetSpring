package com.isamm.bibleoapp.SubClasses;

import com.isamm.bibleoapp.Entity.Admin;

public class ClassLoginAdmin {
    private String token;
    private Admin admin;

    public ClassLoginAdmin(Admin admin,String token) {
        this.admin = admin;
        this.token = token;
    }

    // ################### GETTERS AND SETTERS ###################

    public Admin getAdmin() {
        return admin;
    }

    public String getToken() {
        return token;
    }

    public void setAdmin(Admin admin){
        this.admin = admin;
    }

    public void setToken(String token){
        this.token = token;
    }

    // ################### GETTERS AND SETTERS ###################

    @Override
    public String toString() {
        return "ClassLogin [token=" + token + ", admin=" + admin.toString() + "]";
    }
}
