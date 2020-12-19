package com.buy_posts.Service;

import java.util.ArrayList;

import com.buy_posts.DTO.UserDto;
import com.buy_posts.Model.UserDao;
import com.buy_posts.Repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
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

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        UserDao user = userDao.findByEmail(username);
        if (user == null) {
            throw new UsernameNotFoundException("User not found with username: " + username);
        }
        return new User(user.getEmail(), user.getPassword(), new ArrayList<>());
    }

    public void updateProf(UserDao user, UserDto userInfo) {

        if (userInfo.getImagePath() != null) {
            user.setImagePath(userInfo.getImagePath());
        }
        if (userInfo.getName() != null) {
            user.setName(userInfo.getName());
            ;
        }
        if (userInfo.getPhone() != null) {
            user.setPhone(userInfo.getPhone());
            ;
        }
        if (userInfo.getUsername() != null) {
            user.setUserName(userInfo.getUsername());
            ;
        }
        userDao.save(user);
    }

    public UserDao save(UserDto user) {
        UserDao newUser = new UserDao();
        newUser.setEmail(user.getEmail());
        newUser.setUserName(user.getUsername());
        newUser.setPassword(bcryptEncoder.encode(user.getPassword()));
        newUser.setName(user.getName());
        newUser.setPhone(user.getPhone());
        return userDao.save(newUser);
    }

    public UserDao currentUser(Authentication authentication) {

        String username = authentication.getName();

        return userDao.findByEmail(username);
    }
}
