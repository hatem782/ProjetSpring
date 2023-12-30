package com.isamm.bibleoapp.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.isamm.bibleoapp.Entity.Admin;
import com.isamm.bibleoapp.SubClasses.ClassLogin;
import com.isamm.bibleoapp.dao.UserDao;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    @Autowired
    private UserDao userDao;

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
