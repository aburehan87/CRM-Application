package com.skillcapital;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


//      UserController: This class is implementing the API calls for the user, for all the CRUD operations,
//      "/api/users" are the required calls you need to implement before making an API Call, the rest methods are as follows

@RestController
@RequestMapping("/api/users")
// http://localhost:8080/api/users: all the UserController operations like API calls can be done by sending this request on the POSTMAN
public class UserController
{

//    To use all the UserService implemented methods in this class we Autowire UserService class.
    @Autowired
    private UserService userService;


//    1: CREATE USER
    @PostMapping
    public ResponseEntity<String> createUser(User user)
    {
        userService.saveUser(user);
        return ResponseEntity.ok(" User Created Successfully ! ");
    }


//    1: FIND ALL USERS
    @GetMapping("/all")
    public ResponseEntity<List<User>> findAllUsers()
    {
//        Here we are Returning List of Users, for that creating an object users of List<Users> and the fetching         the .findAllUsers() from the userService class
        List<User> users=userService.findAllUsers();
        return ResponseEntity.ok(users);
    }


//    2: GET USER BY ID
    @GetMapping("/{id}")
//    @PathVariable is used to take id or int as an input for returning userById
    public ResponseEntity<User> getUser(@PathVariable Long id)
    {
        User user = userService.findById(id);
//      return user if it is not null or else return user not found on the POSTMAN
        return user != null ? ResponseEntity.ok(user) : ResponseEntity.notFound().build();
    }


//    3: GET USER BY USERNAME
    @GetMapping("/username/{username}") // Endpoint to get user by username
//    @PathVariable is used to return the username in String format.
    public ResponseEntity<User> getUserByUsername(@PathVariable String username)
    {
        User user = userService.findByUsername(username);
        return user != null ? ResponseEntity.ok(user) : ResponseEntity.notFound().build();
    }


//    4: UPDATING THE USER
    @PutMapping("/{id}")  // Changed from @PostMapping to @PutMapping for updates
    public ResponseEntity<String> updateUser(@PathVariable Long id, @RequestBody User updateUser) {
        User updatedUser = userService.updateUser(id, updateUser); // Call the update method in UserService
        if (updatedUser != null) {
            return ResponseEntity.ok("User Updated Successfully");
        }
        return ResponseEntity.notFound().build();
    }


    //    5: DELETING THE USER
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteUser(@PathVariable Long id)
    {
        if(userService.deleteById(id))
        {
            return ResponseEntity.ok(" User Deleted Successfully ");
        }
        return ResponseEntity.notFound().build();
    }
}
