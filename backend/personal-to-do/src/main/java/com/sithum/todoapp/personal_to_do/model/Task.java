package com.sithum.todoapp.personal_to_do.model;

import java.sql.Date;
import org.springframework.data.annotation.Id;

@Document(collection = "tasks")
public class Task {

    @Id
    private String id;
    private String title;
    private String desc;
    private boolean completed;
    private Date createDate;

    public void setCreatedAt(java.util.Date date) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'setCreatedAt'");
    }

}
