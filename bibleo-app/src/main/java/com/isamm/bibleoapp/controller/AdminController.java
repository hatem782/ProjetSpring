package com.isamm.bibleoapp.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.data.web.SpringDataWebProperties.Pageable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.isamm.bibleoapp.Entity.Adherant;
import com.isamm.bibleoapp.Entity.Admin;
import com.isamm.bibleoapp.Entity.Commentaire;
import com.isamm.bibleoapp.Entity.Emprunt;
import com.isamm.bibleoapp.Entity.Review;
import com.isamm.bibleoapp.Entity.Role;
import com.isamm.bibleoapp.Entity.User;
import com.isamm.bibleoapp.SubClasses.ClassLogin;
import com.isamm.bibleoapp.dao.RoleDao;
import com.isamm.bibleoapp.dao.UserDao;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    @Autowired
    private UserDao userDao;

    @Autowired
    private RoleDao roleDao;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/login-admin")
    public ResponseEntity<Admin> LoginAdmin(@RequestBody ClassLogin login) {

        // let's find the admin by email
        Optional<Admin> admin = userDao.findAdminByEmail(login.getEmail());
        if (!admin.isPresent()) {
            return ResponseEntity.notFound().build();
        }

        // let's check if the password is correct or not
        if (!passwordEncoder.matches(login.getPassword(), admin.get().getPassword())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        // let's return the admin
        return ResponseEntity.status(HttpStatus.OK).body(admin.get());
    }

}
