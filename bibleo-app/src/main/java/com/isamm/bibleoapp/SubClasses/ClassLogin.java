package com.isamm.bibleoapp.SubClasses;

public class ClassLogin {
    private String email;
    private String password;

    public ClassLogin() {
    }

    public ClassLogin(String email, String password) {
        this.email = email;
        this.password = password;
    }

    // ################### GETTERS AND SETTERS ###################

    public String getEmail() {
        return email;
    }

    public String getPassword() {
        return password;
    }

    // ################### GETTERS AND SETTERS ###################

    @Override
    public String toString() {
        return "ClassLogin [email=" + email + ", password=" + password + "]";
    }
}
