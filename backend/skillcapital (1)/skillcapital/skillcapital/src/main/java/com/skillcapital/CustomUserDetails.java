package com.skillcapital;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;


//             CustomerUserDetails : implements the USER DETAILS that chhecks for password and for future scope also CHECKS for
//             AUTHORITIES AND PERMISSIONS


public class CustomUserDetails implements UserDetails
{
    private User user;

    public CustomUserDetails(User user)
    {
        this.user = user;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities()
    {
        // You can define roles/authorities here if needed
        return null;
    }

    @Override
    public String getPassword()
    {
        return user.getPassword();
    }

    @Override
    public String getUsername()
    {
        return user.getUsername();
    }

    @Override
    public boolean isAccountNonExpired()
    {
        return true; // Customize this based on your requirements
    }

    @Override
    public boolean isAccountNonLocked()
    {
        return true; // Customize this based on your requirements
    }

    @Override
    public boolean isCredentialsNonExpired()
    {
        return true; // Customize this based on your requirements
    }

    @Override
    public boolean isEnabled()
    {
        return true; // Customize this based on your requirements
    }

    public User getUser() {
        return user;
    }
}
