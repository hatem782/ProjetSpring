package com.isamm.bibleoapp.SubClasses;

import com.isamm.bibleoapp.Entity.Adherant;
import com.isamm.bibleoapp.Entity.Admin;

public class ClassLoginAdherant {
    private String token;
    private Adherant adherant;

    public ClassLoginAdherant(Adherant adherant,String token) {
        this.adherant = adherant;
        this.token = token;
    }

    // ################### GETTERS AND SETTERS ###################

    public Adherant getAdherant() {
        return adherant;
    }

    public String getToken() {
        return token;
    }

    public void setAdherant(Adherant adherant){
        this.adherant = adherant;
    }

    public void setToken(String token){
        this.token = token;
    }

    // ################### GETTERS AND SETTERS ###################

    @Override
    public String toString() {
        return "ClassLogin [token=" + token + ", adherant=" + adherant.toString() + "]";
    }
}
