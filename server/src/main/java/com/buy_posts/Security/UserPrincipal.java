package com.buy_posts.Security;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import com.buy_posts.Model.UserDao;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

public class UserPrincipal implements UserDetails{
    /**
     *
     */
    private static final long serialVersionUID = 8207922941600671186L;
    UserDao user;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        List<GrantedAuthority> authorities = new ArrayList<>();

        String userRole = user.getRole();
        GrantedAuthority authority = new SimpleGrantedAuthority(userRole);
        authorities.add(authority);

        return authorities;
    }

    /**
     * @return User password.
     */
    @Override
    public String getPassword() {
        return user.getPassword();
    }

    /**
     * @return User username.
     */
    @Override
    public String getUsername() {
        return user.getEmail();
    }

    /**
     * Dummy.
     * @return
     */
    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    /**
     * Dummy.
     * @return
     */
    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    /**
     * Dummy.
     * @return
     */
    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    /**
     * Dummy.
     * @return
     */
    @Override
    public boolean isEnabled() {
        return true;
    }
}
