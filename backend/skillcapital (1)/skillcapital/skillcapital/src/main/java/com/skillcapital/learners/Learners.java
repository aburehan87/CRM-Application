package com.skillcapital.learners;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;


//          Learners: This class defines the entities of how a learners class should be


@Getter
@Setter
@Table(name = "learners")
@Entity
@Data
public class Learners
{
//    This automatically generates the id without initializing the id explicitly
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column
    private String name;

    @Column
    private String idProof;

    @Column
    private String phone;

    @Column
    private String dob;


    @Column(nullable = false, unique = true)
    private String email;

    @Column
    private String registeredDate;

    @Column
    private String location;

    @Column
    private String batchId;

    @Column
    private String alternatePhone;

    @Column
    private String description;

    @Column
    private String exchangeRate;

    @Column
    private String source;

    @Column
    private String attendedDemo;

    @Column
    private String learnerOwner;

    @Column
    private String learnerStage;

    @Column
    private String currency;

    @Column
    private String leadCreatedTime;

    @Column
    private String counsellingDoneBy;

    @Column
    private String courseDetails;

    @Column
    private String preferableTime;

    @Column
    private String techStack;

    @Column
    private String batchTiming;

    @Column
    private String courseComments;

    @Column
    private String modeOfClass;

    @Column
    private String slackAccess;

    @Column
    private String comment;

    @Column
    private String lmsAccess;

}
