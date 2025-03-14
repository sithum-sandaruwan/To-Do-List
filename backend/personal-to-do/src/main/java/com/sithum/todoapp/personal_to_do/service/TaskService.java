package com.sithum.todoapp.personal_to_do.service;

import java.util.Date;
import java.util.List;

import org.springframework.stereotype.Service;

import com.sithum.todoapp.personal_to_do.TaskRepo;
import com.sithum.todoapp.personal_to_do.model.Task;

@Service
public class TaskService {
    private final TaskRepo taskRepository;

    public TaskService(TaskRepo taskRepository) {
        this.taskRepository = taskRepository;
    }

    public List<Task> getAllTasks() {
        return taskRepository.findAll();
    }

    public Task createTask(Task task) {
        System.out.println("recieved task:" + task);
        task.setStartDate(new Date());
        System.out.println("end Date:" + task.getEndDate());

        return taskRepository.save(task);
    }

    public Task markTaskDone(String id) {
        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Task Not Found"));
        task.setCompleted(true);
        return taskRepository.save(task);
    }

}
