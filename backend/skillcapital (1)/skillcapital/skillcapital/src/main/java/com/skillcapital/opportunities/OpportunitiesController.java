package com.skillcapital.opportunities;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;


// OpportunitiesController: This class defines the endpoints for API calls.


@RestController
@RequestMapping("/api/opportunities")
public class OpportunitiesController
{

    @Autowired
    private OpportunitiesService opportunitiesService;

    // Create a new opportunity
    @PostMapping("/register")
    public ResponseEntity<String> registerOpportunity(@RequestBody Opportunities opportunity)
    {
        return opportunitiesService.saveOpportunity(opportunity);
    }


    // Get all opportunities
    @GetMapping("/all")
    public ResponseEntity<List<Opportunities>> getAllOpportunities()
    {
        List<Opportunities> opportunities = opportunitiesService.getAllOpportunities();
        return ResponseEntity.ok(opportunities);
    }

    // Get opportunity by ID
    @GetMapping("/{id}")
    public ResponseEntity<Opportunities> getOpportunityById(@PathVariable Long id)
    {
        Optional<Opportunities> opportunity = opportunitiesService.getOpportunityById(id);
        return opportunity.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Get opportunities by name (case-insensitive)
    @GetMapping("/name/{name}")
    public ResponseEntity<List<Opportunities>> getOpportunitiesByName(@PathVariable String name)
    {
        List<Opportunities> opportunities = opportunitiesService.getOpportunitiesByName(name);
        return ResponseEntity.ok(opportunities);
    }

    // Update an opportunity
    @PutMapping("/{id}")
    public ResponseEntity<Opportunities> updateOpportunity(@PathVariable Long id, @RequestBody Opportunities newOpportunity)
    {
        Opportunities updatedOpportunity = opportunitiesService.updateOpportunity(id, newOpportunity);
        return ResponseEntity.ok(updatedOpportunity);
    }

    // Delete an opportunity by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteOpportunity(@PathVariable Long id)
    {
        opportunitiesService.deleteOpportunity(id);
        return ResponseEntity.ok(" Opportunity Deleted Successfully ");
    }
}
