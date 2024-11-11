package com.skillcapital.courses;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


//       CourseController: This class defines the endpoints by which you can make API calls


@RestController
@RequestMapping("/api/courses")
public class CourseController
{

    @Autowired
    private CourseService courseService;

    // 1: REGISTER COURSE
    @PostMapping("/register")
    public ResponseEntity<String> registerCourse(@RequestBody Course course)
    {
        courseService.saveCourse(course);
        return ResponseEntity.ok("Course registered successfully!");
    }

    // 2: GET ALL COURSES
    @GetMapping("/all")
    public ResponseEntity<List<Course>> findAllCourses()
    {
        List<Course> courses = courseService.findAllCourses();
        return ResponseEntity.ok(courses);
    }

    // 3: GET COURSE BY ID
    @GetMapping("/{id}")
    public ResponseEntity<Course> getCourse(@PathVariable Long id)
    {
        Course course = courseService.findById(id);
        return course != null ? ResponseEntity.ok(course) : ResponseEntity.notFound().build();
    }

    // 4: UPDATE COURSE
    @PutMapping("/{id}")
    public ResponseEntity<String> updateCourse(@PathVariable Long id, @RequestBody Course updatedCourse)
    {
        Course course = courseService.updateCourse(id, updatedCourse);
        if (course != null)
        {
            return ResponseEntity.ok("Course Updated Successfully ! ");
        }
        return ResponseEntity.notFound().build();
    }

    // 5: DELETE COURSE
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteCourse(@PathVariable Long id)
    {
        if (courseService.deleteById(id))
        {
            return ResponseEntity.ok(" Course Deleted Successfully ! ");
        }
        return ResponseEntity.notFound().build();
    }
}
