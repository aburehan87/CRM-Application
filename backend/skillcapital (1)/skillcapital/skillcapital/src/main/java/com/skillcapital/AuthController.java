package com.skillcapital;

import com.skillcapital.jwt.JwtResponse;
import com.skillcapital.jwt.JwtTokenUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

//              AUTH CONTROLLER : this class is responsible for REGISTERING and LOGIN the USER

@RestController
@RequestMapping("/api/auth")
public class AuthController
{
    @Autowired
    private UserService userService;

    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    // 1: REGISTERING A NEW USER
    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@RequestBody User user)
    {
        String result = userService.saveUser(user);
        if (result.startsWith("An error occurred"))
        {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(result);
        }
        return ResponseEntity.ok(result);
    }


    // 2: LOGIN USER
    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody LoginRequest loginRequest)
    {
        try
        {
            boolean loginSuccess = userService.loginUser(loginRequest.getUsername(), loginRequest.getPassword());

            if (loginSuccess)
            {
                String token = jwtTokenUtil.generateToken(loginRequest.getUsername());
                return ResponseEntity.ok(new JwtResponse(token));
            }
            else
            {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid username or password");
            }
        }
        catch (Exception e)
        {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("An error occurred during login: " + e.getMessage());
        }
    }

}
