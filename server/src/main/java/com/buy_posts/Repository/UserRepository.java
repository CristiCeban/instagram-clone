package com.buy_posts.Repository;

import org.springframework.data.repository.CrudRepository;
import com.buy_posts.Model.User;

public interface UserRepository extends  CrudRepository<User, Integer> {
    
}
