package com.isamm.bibleoapp.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HelloController {

    @RequestMapping("/api/hello")
    public String sayHello() {
        return "Hello from Spring Boot 2.1.3!";
    }
}
