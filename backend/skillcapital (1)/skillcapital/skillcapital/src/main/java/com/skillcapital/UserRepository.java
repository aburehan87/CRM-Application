package com.skillcapital;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;


//          UserRepository: This class extends JpaRepository, the UserRepository is able to use all the methods inside the
//          JpaRepository like findByName, findAll, and everything that is present in JpaRepository


@Repository
public interface UserRepository extends JpaRepository<User, Long>
{

//  IgnoreCase will help in finding the email and the user even if it is entered in small or capital letters.
    Optional<User> findByUsernameIgnoreCase(String username);

    // Method to find a user by email (case insensitive)
    Optional<User> findByEmailIgnoreCase(String email);

    // Method to find users by all specified fields (username and email)
    @Query("SELECT u FROM User u WHERE u.username = ?1 AND u.email = ?2")
    List<User> findByAllFields(String username, String email);
}
