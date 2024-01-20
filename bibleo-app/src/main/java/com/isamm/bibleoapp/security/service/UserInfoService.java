package com.isamm.bibleoapp.security.service;


import com.isamm.bibleoapp.Entity.Adherant;
import com.isamm.bibleoapp.Entity.Admin;
import com.isamm.bibleoapp.Entity.User;

import com.isamm.bibleoapp.dao.UserDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserInfoService implements UserDetailsService {

    @Autowired
    private UserDao repository;// Injecter le DAO pour accéder aux données utilisateur
    
 

    @Autowired
    private PasswordEncoder encoder;// Injecter l'encodeur de mot de passe


     // Implémentation de la méthode de l'interface UserDetailsService
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
          // Recherche de l'utilisateur dans la base de données par son nom d'utilisateur (email)
        Optional<User> userDetail = repository.findAnyUserByEmail(username);


        //Si l'utilisateur est trouvé, Converting les détails de l'utilisateur to UserDetails
        return userDetail.map(UserInfoDetails::new)
                .orElseThrow(() -> new UsernameNotFoundException("User not found " + username));
    }


    // Méthode pour ajouter un utilisateur dans la base de données
    public String addUser(User userInfo) {
        // Encoder le mot de passe avant de l'enregistrer dans la base de données
        userInfo.setPassword(encoder.encode(userInfo.getPassword()));
        repository.save(userInfo);
        return "User Added Successfully";
    }

    // Méthode pour ajouter un administrateur dans la base de données
    public String addAdmin(Admin userInfo) {
        // Encoder le mot de passe avant de l'enregistrer dans la base de données
        userInfo.setPassword(encoder.encode(userInfo.getPassword()));
        repository.save(userInfo);
        return "Admin Added Successfully";
    }


}