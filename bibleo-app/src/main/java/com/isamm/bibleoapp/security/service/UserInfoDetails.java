package com.isamm.bibleoapp.security.service;

//import com.example.isamm.entities.User;
import com.isamm.bibleoapp.Entity.User;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Arrays;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

public class UserInfoDetails implements UserDetails {
    // Informations d'utilisateur
    private String name; // Nom d'utilisateur (email)
    private String password; // Mot de passe
    private List<GrantedAuthority> authorities; // Rôles et autorisations de l'utilisateur
    private String id ; // Identifiant de l'utilisateur dans la base de données
 

    // Constructeur prenant un objet User pour initialiser les détails de l'utilisateur
    public UserInfoDetails(User userInfo) {
        name = userInfo.getEmail();
        password = userInfo.getPassword();

         // Convertir les rôles de l'utilisateur en objets GrantedAuthority
        authorities = Arrays.stream(userInfo.getRole().getName().split(","))
                .map(SimpleGrantedAuthority::new)
                .collect(Collectors.toList());
        id=userInfo.getId().toString();
    }

    
    
    
     // Getter pour l'identifiant de l'utilisateur
    public String getId() {return this.id;}

    // Implémentation de l'interface UserDetails
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return name;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;// Le compte de l'utilisateur n'expire jamais
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;// Le compte de l'utilisateur n'est jamais verrouillé
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;// Les informations d'identification de l'utilisateur ne sont jamais expirées
    }

    @Override
    public boolean isEnabled() {
        return true;// L'utilisateur est toujours activé
    }
}