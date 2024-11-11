package com.skillcapital.learners;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;


//      LearnersController: This is responsible for making the API calls


@RestController
@RequestMapping("/api/learners")
public class LearnersController
{

    @Autowired
    private LearnersService learnersService;

    // Create a new learner
    @PostMapping("/register")
    public ResponseEntity<String> registerLearner(@RequestBody Learners learner)
    {
        String result = learnersService.registerLearner(learner);

        // Check the result and return appropriate response
        if (result.equals("Learner registered successfully"))
        {
            return ResponseEntity.ok(result);
        }
        else if (result.equals("Email already exists"))
        {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(result); // 409 Conflict
        }
        else
        {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(result); // 409 Conflict for already existing learner
        }
    }


    // Get all learners
    @GetMapping("/all")
    public List<Learners> getAllLearners()
    {
        return learnersService.getAllLearners();
    }

    // Get learner by ID
    @GetMapping("/{id}")
    public ResponseEntity<Learners> getLearnerById(@PathVariable Long id)
    {
        Optional<Learners> learner = learnersService.getLearnerById(id);
        return learner.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Get Learners by Name
    @GetMapping("/name/{name}")
    public ResponseEntity<Learners> getLearnerByName(@PathVariable String name)
    {
        Learners learner = learnersService.findByName(name);
        return learner != null ? ResponseEntity.ok(learner) : ResponseEntity.notFound().build();
    }

    // Update a learner
    @PutMapping("/{id}")
    public ResponseEntity<Learners> updateLearner(@PathVariable Long id, @RequestBody Learners newLearner)
    {
        Learners updatedLearner = learnersService.updateLearner(id, newLearner);
        return ResponseEntity.ok(updatedLearner);
    }

    // Delete a learner by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteLearner(@PathVariable Long id)
    {
        learnersService.deleteLearner(id);
        return ResponseEntity.ok("Learner deleted successfully");
    }
}
