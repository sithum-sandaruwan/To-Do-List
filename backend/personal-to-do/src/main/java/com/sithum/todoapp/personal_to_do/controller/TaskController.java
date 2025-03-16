package com.sithum.todoapp.personal_to_do.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sithum.todoapp.personal_to_do.model.Task;
import com.sithum.todoapp.personal_to_do.service.TaskService;
import org.springframework.web.bind.annotation.PutMapping;

@RestController
@RequestMapping("/api/tasks")
@CrossOrigin(origins = "http://localhost:3000")
public class TaskController {
    private final TaskService taskService;

    @Autowired
    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }

    @GetMapping
    public List<Task> getAllTasks() {
        return taskService.getAllTasks();
    }

    @PostMapping
    public Task creatTask(@RequestBody Task task) {
        return taskService.createTask(task);
    }

    @PutMapping("/{id}/done")
    public ResponseEntity<Task> markTaskDone(@RequestBody String id) {
        Task task = taskService.markTaskDone(id);
        return ResponseEntity.ok(task);
    }

}
