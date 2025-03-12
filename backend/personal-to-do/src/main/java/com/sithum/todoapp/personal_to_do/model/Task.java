package com.sithum.todoapp.personal_to_do.model;

import java.util.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import jakarta.annotation.sql.DataSourceDefinition;
import lombok.Data;

@Data
@Document(collection = "tasks")
public class Task {

    @Id
    private String id;
    private String task;
    private String description;
    private boolean completed;
    private Date starDate;
    private Date endDate;

}
