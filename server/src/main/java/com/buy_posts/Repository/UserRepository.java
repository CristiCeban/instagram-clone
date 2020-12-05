package com.buy_posts.Repository;

import com.buy_posts.Model.UserDao;

import org.springframework.data.repository.CrudRepository;

public interface UserRepository extends  CrudRepository<UserDao, Integer> {

	UserDao findByEmail(String username);
}
