package com.isamm.bibleoapp.service;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;


import com.isamm.bibleoapp.Entity.Review;
import com.isamm.bibleoapp.dao.ReviewDao;

@Service
public class ReviewService {
    
    @Autowired
    private ReviewDao reviewDao ;


    //save 
    public Review saveReview(Review review) {
        return reviewDao.save(review);
    }

    //get by id
     public Optional<Review> getRevieweById(Long id) {
        return reviewDao.findById(id);
    }

     //get all
    public List<Review> getAllReviews() {
        return reviewDao.findAll();
    }
    //get All pagination
 
    public Page<Review> getAllReviewsPage( @RequestParam(defaultValue = "0") int page,
    @RequestParam(defaultValue = "9") int size) {
        PageRequest pr = PageRequest.of(page, size);
        Page<Review> reviews = reviewDao.findAll(pr);
        return reviews ;
    }
   
     //update 
public Review updateReview(Review review, Long id) {
    Review cmmbd = reviewDao.findById(id).orElseThrow(() -> new RuntimeException("Review not found"));

    // Update fields only if they are not null in the incoming data
    if (Objects.nonNull(review.getRate())) {
        cmmbd.setRate(review.getRate());
    }
    // Update livre and adherent only if they are not null in the incoming data
    if (Objects.nonNull(review.getLivre())) {
        cmmbd.setLivre(review.getLivre());
    }

    if (Objects.nonNull(review.getAdherent())) {
        cmmbd.setAdherent(review.getAdherent());
    }

    // Save the changes to the existing entity
    return reviewDao.save(cmmbd);
}

    //delete 
    public void deleteReview(Long id) {
        reviewDao.deleteById(id);
    }
    
}
