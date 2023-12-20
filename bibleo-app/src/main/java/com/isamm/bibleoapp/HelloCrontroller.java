package com.isamm.bibleoapp;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HelloCrontroller {
    
    @RequestMapping("/hello")
    public String sayHello() {
        return "Hello from Spring Boot 2.1.3!";
    }
}
