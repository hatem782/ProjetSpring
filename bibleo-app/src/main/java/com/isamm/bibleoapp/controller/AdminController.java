package com.isamm.bibleoapp.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.isamm.bibleoapp.Entity.Adherant;
import com.isamm.bibleoapp.Entity.Admin;
import com.isamm.bibleoapp.SubClasses.ClassLogin;
import com.isamm.bibleoapp.SubClasses.ClassLoginAdherant;
import com.isamm.bibleoapp.SubClasses.ClassLoginAdmin;
import com.isamm.bibleoapp.dao.UserDao;
import com.isamm.bibleoapp.security.service.JwtService;
import com.isamm.bibleoapp.security.service.UserInfoDetails;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    @Autowired
    private UserDao userDao;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtService jwtService;

    @PostMapping("/login-admin")
    public ResponseEntity<ClassLoginAdmin> LoginAdmin(@RequestBody ClassLogin login) {

        // let's find the admin by email
        Optional<Admin> admin = userDao.findAdminByEmail(login.getEmail());
        if (!admin.isPresent()) {
            return ResponseEntity.notFound().build();
        }

        // let's check if the password is correct or not
        if (!passwordEncoder.matches(login.getPassword(), admin.get().getPassword())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        UserDetails uid = new UserInfoDetails(admin.get());
        String token = jwtService.generateToken(uid);
        System.out.println(token);

        ClassLoginAdmin cla = new ClassLoginAdmin(admin.get(), token);

        // let's return the admin
        return ResponseEntity.status(HttpStatus.OK).body(cla);
    }

        @PostMapping("/login-user")
    public ResponseEntity<ClassLoginAdherant> LoginUser(@RequestBody ClassLogin login) {

        // let's find the user by email
        Optional<Adherant> user = userDao.findUserByEmail(login.getEmail());
        if (!user.isPresent()) {
            System.out.println("#################################################");
            System.out.println("NOT FOUND USER WITH THIS EMAIL " + login.getEmail());
            System.out.println("#################################################");
            return ResponseEntity.notFound().build();
        }

        // let's check if the password is correct or not
        if (!passwordEncoder.matches(login.getPassword(), user.get().getPassword())) {
            System.out.println("#################################################");
            System.out.println("NOT FOUND USER WITH THIS PASSWORD " + login.getPassword());
            System.out.println("#################################################");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        UserDetails uid = new UserInfoDetails(user.get());
        String token = jwtService.generateToken(uid);
        System.out.println(token);

        ClassLoginAdherant cla = new ClassLoginAdherant(user.get(), token);

        // let's return the user
        return ResponseEntity.status(HttpStatus.OK).body(cla);
    }

}
