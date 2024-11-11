package com.skillcapital.opportunities;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;


//          OppService: This class defines all the CRUD methods used by OppController class.


@Service
public class OpportunitiesService
{

    @Autowired
    private OpportunitiesRepository opportunitiesRepository;

    // Save an opportunity
    public ResponseEntity<String> saveOpportunity(Opportunities opportunity)
    {
        // Check if an opportunity with the same details already exists (excluding email)
        List<Opportunities> existingOpportunitiesWithSameDetails = opportunitiesRepository.findByNameAndOtherFields(
                opportunity.getName(),
                opportunity.getCc(),
                opportunity.getOpportunityStage(),
                opportunity.getPhone(),
                opportunity.getDemoAttendedStage(),
                opportunity.getVisitedStage(),
                opportunity.getFeeQuoted(),
                opportunity.getLostOpportunityReason(),
                opportunity.getBatchTiming(),
                opportunity.getNextFollowUp(),
                opportunity.getLeadStatus(),
                opportunity.getLeadSource(),
                opportunity.getStack(),
                opportunity.getCourse(),
                opportunity.getClassMode(),
                opportunity.getDescription()
        );

        if (!existingOpportunitiesWithSameDetails.isEmpty())
        {
            return ResponseEntity.badRequest().body(" Opportunity Already Exists With The Same Details. ");
        }

        // Check if an opportunity with the same email already exists
        Optional<Opportunities> existingOpportunityByEmail = opportunitiesRepository.findByEmailIgnoreCase(opportunity.getEmail());
        if (existingOpportunityByEmail.isPresent())
        {
            return ResponseEntity.badRequest().body(" Email Already Exists. ");
        }

        // Save the new opportunity if no conflicts are found
        Opportunities savedOpportunity = opportunitiesRepository.save(opportunity);
        return ResponseEntity.ok(" Opportunity Registered Successfully With ID : " + savedOpportunity.getId());
    }


    // Find all opportunities
    public List<Opportunities> getAllOpportunities()
    {
        return opportunitiesRepository.findAll();
    }

    // Find opportunity by ID
    public Optional<Opportunities> getOpportunityById(Long id)
    {
        return opportunitiesRepository.findById(id);
    }

    // Find opportunities by name, case-insensitive
    public List<Opportunities> getOpportunitiesByName(String name)
    {
        return opportunitiesRepository.findByNameIgnoreCase(name);
    }

    // Update an opportunity
    public Opportunities updateOpportunity(Long id, Opportunities newOpportunity)
    {
        return opportunitiesRepository.findById(id)
                .map(opportunity -> {
                    // Update fields as necessary
                    opportunity.setName(newOpportunity.getName());
                    opportunity.setStatus(newOpportunity.getStatus());
                    opportunity.setCc(newOpportunity.getCc());
                    opportunity.setOpportunityStage(newOpportunity.getOpportunityStage());
                    opportunity.setPhone(newOpportunity.getPhone());
                    opportunity.setDemoAttendedStage(newOpportunity.getDemoAttendedStage());
                    opportunity.setEmail(newOpportunity.getEmail());
                    opportunity.setVisitedStage(newOpportunity.getVisitedStage());
                    opportunity.setFeeQuoted(newOpportunity.getFeeQuoted());
                    opportunity.setLostOpportunityReason(newOpportunity.getLostOpportunityReason());
                    opportunity.setBatchTiming(newOpportunity.getBatchTiming());
                    opportunity.setNextFollowUp(newOpportunity.getNextFollowUp());
                    opportunity.setLeadStatus(newOpportunity.getLeadStatus());
                    opportunity.setLeadSource(newOpportunity.getLeadSource());
                    opportunity.setStack(newOpportunity.getStack());
                    opportunity.setCourse(newOpportunity.getCourse());
                    opportunity.setClassMode(newOpportunity.getClassMode());
                    opportunity.setDescription(newOpportunity.getDescription());
                    return opportunitiesRepository.save(opportunity);
                }).orElseThrow(() -> new RuntimeException(" Opportunity Not Found With Id " + id));
    }

    // Delete an opportunity by ID
    public void deleteOpportunity(Long id)
    {
        if (opportunitiesRepository.existsById(id))
        {
            opportunitiesRepository.deleteById(id);
        }
        else
        {
            throw new RuntimeException(" Opportunity Not Found With Id " + id);
        }
    }
}
