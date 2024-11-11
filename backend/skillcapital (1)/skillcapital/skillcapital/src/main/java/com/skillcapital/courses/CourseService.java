package com.skillcapital.courses;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;


//          CourseService: This class implements the CRUD methods used by CourseController class.


@Service
public class CourseService
{

    @Autowired
    private CourseRepository courseRepository;

    // 1: SAVE COURSE
    public Course saveCourse(Course course)
    {
        return courseRepository.save(course);
    }

    // 2: FIND ALL COURSES
    public List<Course> findAllCourses()
    {
        return courseRepository.findAll();
    }

    // 3: FIND COURSE BY ID
    public Course findById(Long id)
    {
        Optional<Course> course = courseRepository.findById(id);
        return course.orElse(null);
    }

    // 4: UPDATE COURSE
    public Course updateCourse(Long id, Course updatedCourse)
    {
        Optional<Course> existingCourseOptional = courseRepository.findById(id);
        if (existingCourseOptional.isPresent())
        {
            Course existingCourse = existingCourseOptional.get();
            // Update course fields
            existingCourse.setCourseImage(updatedCourse.getCourseImage());
            existingCourse.setCourseName(updatedCourse.getCourseName());
            existingCourse.setCourseFee(updatedCourse.getCourseFee());
            existingCourse.setCourseBrochure(updatedCourse.getCourseBrochure());
            existingCourse.setDescription(updatedCourse.getDescription());
            return courseRepository.save(existingCourse);
        }
        return null; // Or throw an exception if needed
    }

    // 5: DELETE COURSE
    public boolean deleteById(Long id)
    {
        if (courseRepository.existsById(id))
        {
            courseRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
