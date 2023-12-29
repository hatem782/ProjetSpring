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
@RequestMapping("/api/adherant")
public class UserController {

    @Autowired
    private UserDao userDao;

    @Autowired
    private RoleDao roleDao;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @GetMapping("/all")
    public Page<Adherant> getAllAdherant(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "9") int size) {
        // i will return all the adherant
        PageRequest pr = PageRequest.of(page, size);
        Page<Adherant> adherant = userDao.findAllUsers(pr);
        return adherant;

    }

    @GetMapping("/one/{id}")
    public ResponseEntity<User> getAdherantById(@PathVariable Long id) {
        // here i will find adherant by id and i will return it if exist or i will
        // not found
        Optional<User> user = userDao.findById(id);
        return user.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping("/create")
    public ResponseEntity<Adherant> createAdherant(@RequestBody Adherant adherant) {

        // here i will get the Role of the adherant and i will set it to the adherant
        Role role = roleDao.findById(2L).get();
        adherant.setRole(role);
        adherant.setPassword(passwordEncoder.encode(adherant.getPassword()));

        // here i will create a new adherant from the body request then i will return it
        Adherant createAdherant = userDao.save(adherant);
        return ResponseEntity.status(HttpStatus.CREATED).body(createAdherant);
    }

    @PostMapping("/login-user")
    public ResponseEntity<Adherant> LoginUser(@RequestBody ClassLogin login) {

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

        // let's return the user
        return ResponseEntity.status(HttpStatus.OK).body(user.get());
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<Adherant> updateAdherant(@RequestBody Adherant adherant,
            @PathVariable Long id) {
        System.out.println(adherant.toString());
        // 1 : i will check if the adherant exist or not
        if (!userDao.findById(id).isPresent()) {
            return ResponseEntity.notFound().build();
        }
        // 2 : i will update the adherant
        adherant.setId(id);
        Adherant updatedAdherant = userDao.save(adherant);

        // 3 : i will return the updated adherant
        return ResponseEntity.status(HttpStatus.OK).body(updatedAdherant);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Adherant> deleteAdherant(@PathVariable Long id) {
        // 1 : i will check if the adherant exist or not
        if (!userDao.findById(id).isPresent()) {
            return ResponseEntity.notFound().build();
        }
        // 2 : i will delete the adherant
        userDao.deleteById(id);

        // 3 : i will return the deleted adherant
        return ResponseEntity.status(HttpStatus.OK).build();
    }
}
