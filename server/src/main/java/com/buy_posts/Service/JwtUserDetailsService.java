package com.buy_posts.Service;

import java.util.ArrayList;
import java.util.List;

import com.buy_posts.DTO.UserDto;
import com.buy_posts.Model.ProductDao;
import com.buy_posts.Model.ProfileResponse;
import com.buy_posts.Model.UserDao;
import com.buy_posts.Repository.ProductRepository;
import com.buy_posts.Repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Profile;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
@Service
public class JwtUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepository userDao;

    @Autowired
    private PasswordEncoder bcryptEncoder;

    @Autowired
    private ProductRepository productRepository;



    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        UserDao user = userDao.findByEmail(username);
        if (user == null) {
            throw new UsernameNotFoundException("User not found with username: " + username);
        }
        return new User(user.getEmail(),user.getPassword(), new ArrayList<>());
    }


    

    public UserDao save(UserDto user){
        UserDao newUser = new UserDao();
        newUser.setEmail(user.getEmail());
        newUser.setUserName(user.getUsername());
        newUser.setPassword(bcryptEncoder.encode(user.getPassword()));
        newUser.setName(user.getName());
        newUser.setPhone(user.getPhone());
        return userDao.save(newUser);
    }
}
