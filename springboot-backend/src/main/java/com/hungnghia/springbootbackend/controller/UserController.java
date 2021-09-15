package com.hungnghia.springbootbackend.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/user/product")
public class UserController {

    @GetMapping
    public void getProduct() {
        System.out.println("User Login!");
    }
}
