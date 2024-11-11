package com.skillcapital.leads;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.util.Date;


//  Lead: This class is the representation of how a lead class should be and its entities


@Getter
@Setter
@Data
@Entity
@Table(name = "leads")
@EntityListeners(AuditingEntityListener.class)
public class Lead
{
    // New field to track creation timestamp
    @CreatedDate
    @Column(nullable = false, updatable = false)
    @Temporal(TemporalType.TIMESTAMP)
    private Date createdAt; // Automatically set when a Lead is created

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false) // Ensuring this field is not null
    private String name;

    @Column(nullable = false) // Ensuring this field is not null
    private String cc;

    @Column(nullable = false) // Ensuring this field is not null
    private String phone;

    @Column(nullable = false, unique = true) // Unique and not null
    private String email;

    @Column(nullable = false) // Ensuring this field is not null
    private double feeQuoted;

    @Column(nullable = false) // Ensuring this field is not null
    private String batchTiming;

    @Column(nullable = true) // Can be null if not required
    private String description;

    @Column(nullable = false) // Ensuring this field is not null
    private String leadStatus;

    @Column(nullable = false) // Ensuring this field is not null
    private String leadSource;

    @Column(nullable = true) // Can be null if not required
    private String stack;

    @Column(nullable = false) // Ensuring this field is not null
    private String course;

    @Column(nullable = false) // Ensuring this field is not null
    private String classMode;

    @Column(nullable = true) // Can be null if not required
    private String nextFollowUp;


}
