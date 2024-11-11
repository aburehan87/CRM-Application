package com.skillcapital.leads;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;
import java.util.List;


//                           LeadController : This class is responsible for API Call methods


@RestController
@RequestMapping("/api/leads")
@CrossOrigin(origins = "*", allowedHeaders = "*")

public class LeadController
{

    @Autowired
    private LeadService leadService;
    
    // 1: CREATING A NEW LEAD
     @PostMapping("/register")
        public ResponseEntity<String> createLead(@RequestBody Lead lead) {
            try {
                String result = leadService.registerLead(lead);
                if (result.equals("Lead Registered Successfully")) {
                    return ResponseEntity.ok(result);
                } else if (result.equals("Email Already Exists")) {
                    return ResponseEntity.status(409).body(result);
                } else {
                    return ResponseEntity.status(400).body(result);
                }
            } catch (Exception e) {
                e.printStackTrace();
                return ResponseEntity.status(500).body("Error occurred: " + e.getMessage());
            }
        }


    // 2: FIND ALL LEADS
    @GetMapping("/all")
    public ResponseEntity<List<Lead>> findAllLeads()
    {
        List<Lead> leads = leadService.findAllLeads();
        return ResponseEntity.ok(leads);
    }


    // 3: GET LEAD BY ID
    @GetMapping("/{id}")
    public ResponseEntity<Lead> getLead(@PathVariable Long id)
    {
        Lead lead = leadService.findById(id);
        return lead != null ? ResponseEntity.ok(lead) : ResponseEntity.notFound().build();
    }

    // 4: GET LEAD BY NAME
    @GetMapping("/name/{name}") // New endpoint to get lead by name
    public ResponseEntity<Lead> getLeadByName(@PathVariable String name)
    {
        Lead lead = leadService.findByName(name);
        return lead != null ? ResponseEntity.ok(lead) : ResponseEntity.notFound().build();
    }

    // 5: UPDATE LEAD BY ID
    @PutMapping("/{id}")
    public ResponseEntity<String> updateLead(@PathVariable Long id, @RequestBody Lead updatedLead)
    {
        Lead lead = leadService.updateLead(id, updatedLead);
        if (lead != null)
        {
            return ResponseEntity.ok("Lead Updated Successfully");
        }
        return ResponseEntity.notFound().build(); // Returns 404 if the lead was not found
    }


    // 6: DELETE LEAD BY ID
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteLead(@PathVariable Long id)
    {
        if (leadService.deleteById(id))
        {
            return ResponseEntity.ok("Lead Deleted Successfully");
        }
        return ResponseEntity.notFound().build();
    }


//    7: Lead Count Per Hour With details
    // Endpoint to get leads per hour with details
// Endpoint to get leads per hour with details
    @GetMapping("/leads-per-hour")
    public ResponseEntity<List<Object[]>> getLeadsPerHour(
            @RequestParam("start") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) Date start,
            @RequestParam("end") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) Date end) {

        // Fetch leads per hour from the service
        List<Object[]> leadsPerHour = leadService.getLeadsPerHour(start, end);

        // Return the results
        return ResponseEntity.ok(leadsPerHour);
    }



    // Endpoint to get lead count per hour
    @GetMapping("/lead-count-per-hour")
    public ResponseEntity<List<Object[]>> getLeadCountPerHour(
            @RequestParam("start") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) Date start,
            @RequestParam("end") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) Date end) {

        // Validate start and end dates
        if (start.after(end)) {
            return ResponseEntity.badRequest().body(null); // Return null as body to indicate a bad request
        }

        List<Object[]> leadCountPerHour = leadService.getLeadCountPerHour(start, end);

        // Return [0, 0] if no leads are found in the specified time range
        if (leadCountPerHour.isEmpty()) {
            leadCountPerHour.add(new Object[]{0, 0});
        }

        return ResponseEntity.ok(leadCountPerHour);
    }


    // Endpoint to get lead status count
    @GetMapping("/today-leads-hourly")
    public ResponseEntity<List<Object[]>> getTodayLeadsHourly() {
        Date start = Date.from(Instant.now().truncatedTo(ChronoUnit.DAYS));
        Date end = Date.from(Instant.now());
        List<Object[]> leadCountPerHour = leadService.getLeadCountPerHour(start, end);
        return ResponseEntity.ok(leadCountPerHour);
    }

    @GetMapping("/lead-status-count")
    public ResponseEntity<List<Object[]>> getLeadStatusCount() {
        List<Object[]> leadStatusCount = leadService.getLeadStatusCount();
        return ResponseEntity.ok(leadStatusCount);
    }
}
