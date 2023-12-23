package com.isamm.bibleoapp.controller;




import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


import com.isamm.bibleoapp.Entity.Review;
import com.isamm.bibleoapp.service.ReviewService;


@RestController
@RequestMapping("/reviews")
public class ReviewController {

    @Autowired
    private ReviewService reviewService;



    //save
    @PostMapping
    public Review saveReview(@RequestBody Review review) {
        return reviewService.saveReview(review);
    }
   
    //get All
    @GetMapping
    public List<Review> getAllReviews() {
        return reviewService.getAllReviews();
    }

    //get by id 
    @GetMapping("/{id}")
    public Optional<Review> getReviewById(@PathVariable Long id) {
        return reviewService.getRevieweById(id);
    }

    //update
    @PutMapping("/{id}")
    public Review updateReview(@PathVariable("id") Long id, @RequestBody Review review) {        
        return reviewService.updateReview(review, id);

    }




    //delete
    @DeleteMapping("/{id}")
    public String deleteReview(@PathVariable Long id) {
        reviewService.deleteReview(id);
        return"Deleted Successfully";
    }
    
}
