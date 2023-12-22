package com.isamm.bibleoapp.dao;

import org.springframework.boot.autoconfigure.data.web.SpringDataWebProperties.Pageable;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.JpaRepository;

import com.isamm.bibleoapp.Entity.Livre;

public interface LivreDao extends JpaRepository<Livre, Long> {

}
