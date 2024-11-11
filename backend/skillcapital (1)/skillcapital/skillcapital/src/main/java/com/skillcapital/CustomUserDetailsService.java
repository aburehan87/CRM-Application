package com.skillcapital;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;


//       CustomUserDetailsService: implements the UserDetailsService, used to fetch all the methods implemented in the
//       UserDetailsService and also responsible for LOADING the USER by USERNAME


@Service
public class CustomUserDetailsService implements UserDetailsService
{

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException
    {
        Optional<User> userOptional = userRepository.findByUsernameIgnoreCase(username);
        if (!userOptional.isPresent())
        {
            throw new UsernameNotFoundException("User not found with username: " + username);
        }
        return new CustomUserDetails(userOptional.get());
    }
}
