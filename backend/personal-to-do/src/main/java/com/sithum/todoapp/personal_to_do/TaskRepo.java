package com.sithum.todoapp.personal_to_do;

import java.util.List;

import com.sithum.todoapp.personal_to_do.model.Task;

public interface TaskRepo extends MongoRepository<Task, String> {

    List<Task> findByCompleted(boolean completed);
}