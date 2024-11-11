package com.skillcapital.leads;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;


//                  LeadService: This is responsible for implementing methods used by the LeadController for CRUD operations.


@Service
public class LeadService
{

    private final LeadRepository leadRepository;




    @Autowired
    public LeadService(LeadRepository leadRepository)
    {
        this.leadRepository = leadRepository;
    }

    // 1: SAVING THE LEAD
    public String registerLead(Lead lead) {
        // Check if a lead with the same email already exists
        if (leadRepository.existsByEmail(lead.getEmail())) {
            return "Email Already Exists";
        }

        // Check if the same lead (name and email match) is already registered
        Optional<Lead> existingLead = leadRepository.findByNameAndEmailIgnoreCase(lead.getName(), lead.getEmail());

        if (existingLead.isPresent()) {
            // Update the existing lead
            Lead updatedLead = existingLead.get();
            updatedLead.setCc(lead.getCc());
            updatedLead.setPhone(lead.getPhone());
            updatedLead.setFeeQuoted(lead.getFeeQuoted());
            updatedLead.setBatchTiming(lead.getBatchTiming());
            updatedLead.setDescription(lead.getDescription());
            updatedLead.setLeadStatus(lead.getLeadStatus());
            updatedLead.setLeadSource(lead.getLeadSource());
            updatedLead.setStack(lead.getStack());
            updatedLead.setCourse(lead.getCourse());
            updatedLead.setClassMode(lead.getClassMode());
            updatedLead.setNextFollowUp(lead.getNextFollowUp());

            leadRepository.save(updatedLead);
            return "Lead Updated Successfully";
        }

        // Save the new lead
        leadRepository.save(lead);
        return "Lead Registered Successfully";
    }


    // 2: FIND ALL LEADS
    public List<Lead> findAllLeads()
    {
        return leadRepository.findAll();
    }


    // 3: FIND BY NAME
    public Lead findByName(String name)
    {
        Optional<Lead> lead = leadRepository.findByNameIgnoreCase(name);
        return lead.orElse(null);
    }

    // 4: FIND BY ID
    public Lead findById(Long id)
    {
        Optional<Lead> lead = leadRepository.findById(id);
        return lead.orElse(null);
    }

    // 5: UPDATE BY ID
    public Lead updateLead(Long id, Lead updatedLead)
    {
        Optional<Lead> existingLeadOptional = leadRepository.findById(id);
        if (existingLeadOptional.isPresent())
        {
            Lead existingLead = existingLeadOptional.get();

            // Update all fields
            existingLead.setName(updatedLead.getName());
            existingLead.setCc(updatedLead.getCc());
            existingLead.setPhone(updatedLead.getPhone());
            existingLead.setEmail(updatedLead.getEmail());
            existingLead.setFeeQuoted(updatedLead.getFeeQuoted());
            existingLead.setBatchTiming(updatedLead.getBatchTiming());
            existingLead.setDescription(updatedLead.getDescription());
            existingLead.setLeadStatus(updatedLead.getLeadStatus());
            existingLead.setLeadSource(updatedLead.getLeadSource());
            existingLead.setStack(updatedLead.getStack());
            existingLead.setCourse(updatedLead.getCourse());
            existingLead.setClassMode(updatedLead.getClassMode());
            existingLead.setNextFollowUp(updatedLead.getNextFollowUp());

            return leadRepository.save(existingLead); // Save updated entity
        }
        return null; // Return null if the lead is not found
    }


    // 6: DELETE BY ID
    public boolean deleteById(Long id)
    {
        if (leadRepository.existsById(id))
        {
            leadRepository.deleteById(id);
            return true;
        }
        return false;
    }


    public List<Object[]> getLeadsPerHour(Date start, Date end) {
        return leadRepository.findLeadsPerHour(start, end);
    }


    public List<Object[]> getLeadCountPerHour(Date start, Date end) {
        return leadRepository.findLeadCountPerHour(start, end);
    }

    public List<Object[]> getLeadStatusCount() {
        return leadRepository.findLeadStatusCount();
    }
}
