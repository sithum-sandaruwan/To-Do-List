package com.sithum.todoapp.personal_to_do.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sithum.todoapp.personal_to_do.entity.Task;
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
    public ResponseEntity<Object> getAllTasks(@AuthenticationPrincipal OAuth2User principal) {
        String userId = principal.getAttribute("userId");
        return ResponseEntity.ok(taskService.getAllTasksForUser(userId));
    }

    @PostMapping
    public ResponseEntity<Task> createTask(@RequestBody Task task,
            @AuthenticationPrincipal OAuth2User principal) {
        String userId = principal.getAttribute("userId");
        task.setUserId(userId); // Make sure your Task entity has userId field
        return ResponseEntity.ok(taskService.createTask(task));
    }

    @PutMapping("/{id}/edit")
    public ResponseEntity<Task> updateTask(@PathVariable String id,
            @RequestBody Task updatedTask,
            @AuthenticationPrincipal OAuth2User principal) {
        String userId = principal.getAttribute("userId");
        updatedTask.setUserId(userId);
        Task task = taskService.updateTask(id, updatedTask, userId);
        return ResponseEntity.ok(task);
    }

    @DeleteMapping("/{id}/delete")
    public ResponseEntity<Void> deleteTask(@PathVariable String id,
            @AuthenticationPrincipal OAuth2User principal) {
        String userId = principal.getAttribute("userId");
        taskService.deleteTask(id, userId);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{id}/delete")
    public ResponseEntity<Void> deleteTask(@PathVariable String id) {
        taskService.deleteTask(id);
        return ResponseEntity.noContent().build();
    }

}
