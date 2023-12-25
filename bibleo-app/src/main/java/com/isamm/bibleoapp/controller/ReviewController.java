package com.isamm.bibleoapp.controller;




import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
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

     //get All pagination
    @GetMapping("/page")
    public Page<Review> getAllReviewsPage( @RequestParam(defaultValue = "0") int page,
    @RequestParam(defaultValue = "9") int size) {
        return reviewService.getAllReviewsPage(page, size) ;
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
