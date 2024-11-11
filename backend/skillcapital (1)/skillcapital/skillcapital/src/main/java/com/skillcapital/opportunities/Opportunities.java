package com.skillcapital.opportunities;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;


// Opportunities: This class defines how the opp class should look like


@Getter
@Setter
@Entity
@Table(name = "opportunities")
@Data
public class Opportunities
{
//    Id is automatically generated without initializing the values explicitly.
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)  // Auto-incrementing ID
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String status;

    @Column(nullable = false)
    private String cc;

    @Column
    private String opportunityStage;

    // Changed from int to String to handle larger phone numbers
    @Column(nullable = false)
    private String phone;

    @Column
    private String demoAttendedStage;

    @Column(nullable = false, unique = true)
    private String email;

    // Remove unique constraint if it causes conflicts
    @Column(nullable = false)
    private String visitedStage;

    @Column(nullable = false)
    private String feeQuoted;

    @Column
    private String lostOpportunityReason;

    @Column
    private String batchTiming;

    @Column(nullable = false)
    private String nextFollowUp;

    @Column
    private String leadStatus;

    @Column
    private String leadSource;

    @Column(nullable = false)
    private String stack;

    @Column
    private String course;

    @Column
    private String classMode;

    @Column(nullable = false)
    private String description;
}
