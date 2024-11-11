package com.skillcapital.courses;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


//              CourseRepo: This extends the JpaRepo so that it can use all the inbuilt JPA methods.


@Repository
public interface CourseRepository extends JpaRepository<Course, Long>
{
    // Additional query methods can be defined here if needed
}
