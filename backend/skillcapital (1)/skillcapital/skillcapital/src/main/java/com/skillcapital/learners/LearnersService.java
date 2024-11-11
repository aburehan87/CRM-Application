package com.skillcapital.learners;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;


// LearnersService: This class defines the CRUD methods which are implemented by the LearnersController


@Service
public class LearnersService
{

    @Autowired
    private LearnersRepository learnersRepository;

    // Save a learner
    public String registerLearner(Learners learner)
    {
        // Check if the same learner (all details match) is already registered
        Optional<Learners> existingLearner = learnersRepository
                .findByNameIgnoreCase( learner.getEmail());

        // Here we check if a learner already exists with the same first name, last name, and email
        if (existingLearner.isPresent())
        {
            return "Learner already exists with the same details";
        }

        // Check if a learner with the same email already exists
        if (learnersRepository.existsByEmail(learner.getEmail()))
        {
            return "Email already exists";
        }

        // Save the new learner
        learnersRepository.save(learner);
        return "Learner registered successfully";
    }

    // Find all learners
    public List<Learners> getAllLearners()
    {
        return learnersRepository.findAll();
    }

    // Find learner by ID
    public Optional<Learners> getLearnerById(Long id)
    {
        return learnersRepository.findById(id);
    }

    // Find learners by first name and last name (case-insensitive)
    public Learners findByName(String name)
    {
        Optional<Learners> learner = learnersRepository.findByNameIgnoreCase(name);
        return learner.orElse(null);
    }

    // Update a learner
    public Learners updateLearner(Long id, Learners newLearner)
    {
        return learnersRepository.findById(id)
                .map(learner -> {
                    learner.setName(newLearner.getName());
                    learner.setIdProof(newLearner.getIdProof());
                    learner.setPhone(newLearner.getPhone());
                    learner.setDob(newLearner.getDob());
                    learner.setEmail(newLearner.getEmail());
                    learner.setRegisteredDate(newLearner.getRegisteredDate());
                    learner.setLocation(newLearner.getLocation());
                    learner.setBatchId(newLearner.getBatchId());
                    learner.setAlternatePhone(newLearner.getAlternatePhone());
                    learner.setDescription(newLearner.getDescription());
                    learner.setExchangeRate(newLearner.getExchangeRate());
                    learner.setSource(newLearner.getSource());
                    learner.setAttendedDemo(newLearner.getAttendedDemo());
                    learner.setLearnerOwner(newLearner.getLearnerOwner());
                    learner.setLearnerStage(newLearner.getLearnerStage());
                    learner.setCurrency(newLearner.getCurrency());
                    learner.setLeadCreatedTime(newLearner.getLeadCreatedTime());
                    learner.setCounsellingDoneBy(newLearner.getCounsellingDoneBy());
                    learner.setCourseDetails(newLearner.getCourseDetails());
                    learner.setPreferableTime(newLearner.getPreferableTime());
                    learner.setTechStack(newLearner.getTechStack());
                    learner.setBatchTiming(newLearner.getBatchTiming());
                    learner.setCourseComments(newLearner.getCourseComments());
                    learner.setModeOfClass(newLearner.getModeOfClass());
                    learner.setSlackAccess(newLearner.getSlackAccess());
                    learner.setComment(newLearner.getComment());
                    learner.setLmsAccess(newLearner.getLmsAccess());
                    return learnersRepository.save(learner);
                }).orElseThrow(() -> new RuntimeException("Learner not found with id " + id));
    }

    // Delete a learner by ID
    public void deleteLearner(Long id)
    {
        learnersRepository.deleteById(id);
    }
}
