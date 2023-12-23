package com.isamm.bibleoapp.dao;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.isamm.bibleoapp.Entity.Adherant;
// import com.isamm.bibleoapp.Entity.Admin;
import com.isamm.bibleoapp.Entity.User;

public interface UserDao extends JpaRepository<User, Long> {
    
    // FIND ALL USERS WHERE ROLE IS ADMIN
    @Query("SELECT u FROM User u WHERE u.role.name = 'ADMIN'")
    List<User> findAllAdmins();

    // FIND ALL USERS WHERE ROLE IS USER
    @Query("SELECT u FROM User u WHERE u.role.name = 'USER'")
    List<User> findAllUsers();


      
}
