package com.skillcapital.opportunities;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;


// OppRepo: This class uses all the methods which are provided by the JpaRepository


@Repository
public interface OpportunitiesRepository extends JpaRepository<Opportunities, Long>
{

    // Method to find an opportunity by email (ignoring case)
    Optional<Opportunities> findByEmailIgnoreCase(String email);

    // Method to find opportunities by name (case insensitive)
    List<Opportunities> findByNameIgnoreCase(String name);

    // Method to find opportunities by name and all other fields
    @Query("SELECT o FROM Opportunities o WHERE o.name = ?1 AND o.cc = ?2 AND o.opportunityStage = ?3 AND " +
            "o.phone = ?4 AND o.demoAttendedStage = ?5 AND o.visitedStage = ?6 AND " +
            "o.feeQuoted = ?7 AND o.lostOpportunityReason = ?8 AND o.batchTiming = ?9 AND " +
            "o.nextFollowUp = ?10 AND o.leadStatus = ?11 AND o.leadSource = ?12 AND " +
            "o.stack = ?13 AND o.course = ?14 AND o.classMode = ?15 AND o.description = ?16")
    List<Opportunities> findByNameAndOtherFields(String name, String cc, String opportunityStage, String phone,
                                                 String demoAttendedStage, String visitedStage, String feeQuoted,
                                                 String lostOpportunityReason, String batchTiming,
                                                 String nextFollowUp, String leadStatus, String leadSource,
                                                 String stack, String course, String classMode, String description);
}
