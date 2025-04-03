package com.sithum.todoapp.personal_to_do;

import java.util.List;
import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.sithum.todoapp.personal_to_do.entity.Task;

public interface TaskRepo extends MongoRepository<Task, String> {

    List<Task> findByCompleted(boolean completed);

    List<Task> findAll();

    Task save(Task task);

}