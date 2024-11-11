package com.skillcapital.leads;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;
import java.util.Optional;


//    LeadRepository: This class implements JpaRepository so that it can use all the Jpa In Built methods


@Repository
public interface LeadRepository extends JpaRepository<Lead, Long>
{
    // Method to check if email exists
    boolean existsByEmail(String email);

    // Method to find a lead by name and email (ignoring case)
    Optional<Lead> findByNameAndEmailIgnoreCase(String name, String email);

    Optional<Lead> findByNameIgnoreCase(String name);

    // Query to get leads per hour with details (PostgreSQL example)
    @Query("SELECT EXTRACT(HOUR FROM l.createdAt) AS hour, l " +
            "FROM Lead l " +
            "WHERE l.createdAt BETWEEN :start AND :end " +
            "GROUP BY hour, l")
    List<Object[]> findLeadsPerHour(@Param("start") Date start, @Param("end") Date end);

    // Query to get count of leads per hour (PostgreSQL example)
    @Query("SELECT EXTRACT(HOUR FROM l.createdAt) AS hour, COUNT(l) " +
            "FROM Lead l " +
            "WHERE l.createdAt BETWEEN :start AND :end " +
            "GROUP BY hour")
    List<Object[]> findLeadCountPerHour(@Param("start") Date start, @Param("end") Date end);

    // Query to get the count of leads grouped by status
    @Query("SELECT l.leadStatus, COUNT(l) FROM Lead l GROUP BY l.leadStatus")
    List<Object[]> findLeadStatusCount();
}


