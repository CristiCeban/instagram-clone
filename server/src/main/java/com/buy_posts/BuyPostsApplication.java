package com.buy_posts;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;

@SpringBootApplication()
public class BuyPostsApplication {
    public static void main(String[] args) {
        SpringApplication.run(BuyPostsApplication.class, args);
    }
}
