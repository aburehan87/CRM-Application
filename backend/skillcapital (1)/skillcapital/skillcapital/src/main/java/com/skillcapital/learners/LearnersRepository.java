package com.skillcapital.learners;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;


//  LearnersRepository: this is responsible for using all the methods inside the JpaRespository


@Repository
public interface LearnersRepository extends JpaRepository<Learners, Long>
{

    // Method to find learners by email
    boolean existsByEmail(String email);

    // Method to find a learner by first name, last name, and email (ignoring case)
    Optional<Learners> findByNameAndEmailIgnoreCase(String firstName, String lastName);

    // Method to find learners by first name and last name (case-insensitive)
    Optional<Learners> findByNameIgnoreCase(String name);
}
