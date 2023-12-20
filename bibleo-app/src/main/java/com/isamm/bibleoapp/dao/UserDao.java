package com.isamm.bibleoapp.dao;

import org.springframework.data.jpa.repository.JpaRepository;

// import com.isamm.bibleoapp.Entity.Admin;
import com.isamm.bibleoapp.Entity.User;

public interface UserDao extends JpaRepository<User, User> {
    
}
