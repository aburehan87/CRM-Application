package com.skillcapital.jwt;

import com.skillcapital.jwt.JwtTokenUtil; // Import your JwtTokenUtil
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import java.io.IOException;



//       JwtRequestFilter: This class is responsible for Verifying the JWT TOKENS for Authorization purpose


@Component
public class JwtRequestFilter extends OncePerRequestFilter
{

    @Autowired
    private UserDetailsService userDetailsService; // Autowired UserDetailsService

    @Autowired
    private JwtTokenUtil jwtTokenUtil; // Autowired JwtTokenUtil

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
            throws ServletException, IOException
    {

        final String authorizationHeader = request.getHeader(" Authorization ");

        String username = null;
        String jwt = null;

        if (authorizationHeader != null && authorizationHeader.startsWith(" Bearer "))
        {
            jwt = authorizationHeader.substring(7); // Remove "Bearer " prefix
            username = jwtTokenUtil.extractUsername(jwt); // Use JwtTokenUtil to extract username
        }

        if (username != null && SecurityContextHolder.getContext().getAuthentication() == null)
        {
            UserDetails userDetails = this.userDetailsService.loadUserByUsername(username);
            if (jwtTokenUtil.validateToken(jwt, userDetails.getUsername()))
            { // Use JwtTokenUtil to validate the token
                UsernamePasswordAuthenticationToken authenticationToken =
                        new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
                authenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                SecurityContextHolder.getContext().setAuthentication(authenticationToken);
            }
        }

        chain.doFilter(request, response);
    }


}
