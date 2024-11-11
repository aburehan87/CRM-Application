package com.skillcapital;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

//          UserService: This class is used to implement the methods for CRUD operations which are used in UserController class
//          This class implements the methods for CRUD operations
//          Controller Class: used for mapping
//          Service Class: used for implementing the mapping methods


@Service
public class UserService
{
    @Autowired
    private UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository)
    {
        this.userRepository = userRepository;
        this.passwordEncoder = new BCryptPasswordEncoder();
    }

    // 1: SAVING THE USER
    public String saveUser(User user)
    {
        try {
            // Check for existing user, if yes then it will not register the same user again
            List<User> existingUsersWithSameDetails = userRepository.findByAllFields(
                    user.getUsername(), user.getEmail());

            if (!existingUsersWithSameDetails.isEmpty())
            {
                return " User Credentials Already Exists. ";
            }

            // Check for existing user by email only
            Optional<User> existingUserByEmail = userRepository.findByEmailIgnoreCase(user.getEmail());
            if (existingUserByEmail.isPresent())
            {
                return " Email Already Exists Or In Use. ";
            }

            // Hashing the password before saving
            user.setPassword(passwordEncoder.encode(user.getPassword()));
            userRepository.save(user);
            return " User Registered Successfully ";
        }
        catch (Exception e)
        {
            // Log the error (you can use a logger here)
            System.out.println(" Error During User Registration : " + e.getMessage());
            return " An Error Occurred During User Registration : " + e.getMessage();
        }
    }


    public boolean loginUser(String username, String rawPassword)
    {
        Optional<User> userOptional = userRepository.findByUsernameIgnoreCase(username);

        if (userOptional.isPresent())
        {
            User user = userOptional.get();
            // Verify if the provided password matches the hashed password in the database
            boolean isPasswordMatch = passwordEncoder.matches(rawPassword, user.getPassword());
            if (isPasswordMatch)
            {
                return true;
            }
            else
            {
                System.out.println(" Password Mismatch For User : " + username);
            }
        }
        else
        {
            System.out.println(" User Not Found : " + username);
        }
        return false; // User not found
    }



    // 2: FIND ALL USERS
    public List<User> findAllUsers()
    {
        return userRepository.findAll();
    }

    // 3: FIND USERNAME BY ID
    public User findById(Long id)
    {
        Optional<User> user = userRepository.findById(id);
        return user.orElse(null);
    }

    // 4: FINDING USERNAME BY USERNAME
    public User findByUsername(String username)
    {
        return userRepository.findByUsernameIgnoreCase(username).orElse(null);
    }

    // 5: UPDATING USER
    public User updateUser(Long id, User updatedUser)
    {
        Optional<User> existingUserOptional = userRepository.findById(id);
        if (existingUserOptional.isPresent())
        {
            User existingUser = existingUserOptional.get();
            // Update user fields
            existingUser.setUsername(updatedUser.getUsername());
            existingUser.setEmail(updatedUser.getEmail());

            // If the password is provided, update it (hash before saving)
            if (updatedUser.getPassword() != null && !updatedUser.getPassword().isEmpty())
            {
                existingUser.setPassword(passwordEncoder.encode(updatedUser.getPassword()));
            }

            return userRepository.save(existingUser); // Save updated user
        }
        return null; // Or throw an exception if needed
    }

    // 6: DELETE USERNAME BY ID
    public boolean deleteById(Long id)
    {
        if (userRepository.existsById(id))
        {
            userRepository.deleteById(id);
            return true;
        }
        return false;
    }

    // 7: CHECKING PASSWORD
    public boolean checkPassword(String rawPassword, String encodedPassword)
    {
        return passwordEncoder.matches(rawPassword, encodedPassword);
    }
}
