package com.todo.todo_app.service;

import com.todo.todo_app.model.Task;
import com.todo.todo_app.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TaskService {
    @Autowired
    private TaskRepository taskRepository;

    //récupérer toute les taches
    public List<Task> getAllTasks() {return taskRepository.findAll(); }

    //récupérer les tâches par leur id
    public Task getTaskById(Long id) {return taskRepository.findById(id).orElse(null); }

    //sauvegarder une task
    public Task saveTask(Task task){ return taskRepository.save(task); }

    //supprimer une tache
    public void deleteTask(Long id){ taskRepository.deleteById(id);}
}

