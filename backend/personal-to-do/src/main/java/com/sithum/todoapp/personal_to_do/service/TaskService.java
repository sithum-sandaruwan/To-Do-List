package com.sithum.todoapp.personal_to_do.service;

import java.util.Date;
import java.util.List;

import org.springframework.stereotype.Service;

import com.sithum.todoapp.personal_to_do.TaskRepo;
import com.sithum.todoapp.personal_to_do.entity.Task;

@Service
public class TaskService {
    private final TaskRepo taskRepository;

    public TaskService(TaskRepo taskRepository) {
        this.taskRepository = taskRepository;
    }

    public List<Task> getAllTasks(String userId) {
        return taskRepository.findAll();

    }

    public Task createTask(Task task) {
        System.out.println("recieved task:" + task);
        task.setStartDate(new Date());
        System.out.println("end Date:" + task.getEndDate());

        return taskRepository.save(task);
    }

    public Task markTaskDone(String id, String userId) {
        Task task = taskRepository.findByIdAndUserID(id, userId)
                .orElseThrow(() -> new RuntimeException("Task Not Found"));
        task.setCompleted(true);
        return taskRepository.save(task);
    }

    public Task updateTask(String id, Task updatedTask) {
        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Task Not Found"));

        task.setTask(updatedTask.getTask());
        task.setDescription(updatedTask.getDescription());
        task.setCompleted(updatedTask.isCompleted());
        task.setStartDate(updatedTask.getStartDate());
        task.setEndDate(updatedTask.getEndDate());

        return taskRepository.save(task);
    }

    public void deleteTask(String id) {
        taskRepository.deleteById(id);
    }

    public Object getAllTasksForUser(String userId) {
        return taskRepository.findByUserId(userId);
    }

    public void deleteTask(String id, String userId) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'deleteTask'");
    }

    public Task updateTask(String id, Task updatedTask, String userId) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'updateTask'");
    }

}
