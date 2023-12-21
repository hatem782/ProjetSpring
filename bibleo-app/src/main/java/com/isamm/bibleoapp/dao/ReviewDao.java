package com.isamm.bibleoapp.dao;



import org.springframework.data.jpa.repository.JpaRepository;

import com.isamm.bibleoapp.Entity.Review;




public interface ReviewDao extends JpaRepository<Review,Long>{
    
}
