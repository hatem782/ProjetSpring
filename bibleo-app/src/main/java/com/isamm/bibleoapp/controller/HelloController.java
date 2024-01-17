package com.isamm.bibleoapp.controller;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HelloController {
    
    @RequestMapping("/hello")
    @PreAuthorize("hasAuthority('ADMIN')")
    public String sayHello() {
        return "Hello from Spring Boot 2.1.3!";
    }
}
