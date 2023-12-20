package com.isamm.bibleoapp.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.isamm.bibleoapp.Entity.Role;

public interface RoleDao extends JpaRepository<Role, Long> {
    
}
