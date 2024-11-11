package com.skillcapital.courses;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;


//          Course: This class defines how a course class should look and its entities


@Getter
@Setter
@Table(name="course")
@Entity
@Data
public class Course
{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String courseImage;

    @Column
    private String courseName;

    @Column
    private String courseFee;

    @Column
    private String courseBrochure;

    @Column
    private String description;


}
