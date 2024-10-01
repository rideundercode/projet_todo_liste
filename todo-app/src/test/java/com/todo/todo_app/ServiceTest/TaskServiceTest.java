package com.todo.todo_app.service;

import com.todo.todo_app.enumerateur.TaskStatus;
import com.todo.todo_app.model.Task;
import com.todo.todo_app.repository.TaskRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class TaskServiceTest {

    @InjectMocks
    private TaskService taskService; // Classe que l'on veut tester

    @Mock
    private TaskRepository taskRepository; // Dépendance à simuler

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this); // Initialiser les mocks
    }

    @Test
    void testGetAllTasks() {
        // Préparer des données de test
        List<Task> tasks = Arrays.asList(
                new Task("Task 1", "Description 1", TaskStatus.TO_DO),
                new Task("Task 2", "Description 2", TaskStatus.IN_PROGRESS)
        );

        // Simuler le comportement du repository
        when(taskRepository.findAll()).thenReturn(tasks);

        // Appeler la méthode du service
        List<Task> result = taskService.getAllTasks();

        // Vérifier les résultats
        assertEquals(2, result.size());
        assertEquals("Task 1", result.get(0).getTitle());
        assertEquals(TaskStatus.TO_DO, result.get(0).getStatus());

        // Vérifier que la méthode findAll a été appelée
        verify(taskRepository, times(1)).findAll();
    }

    @Test
    void testGetTaskById() {
        // Préparer une tâche de test
        Task task = new Task("Task 1", "Description 1", TaskStatus.TO_DO);

        // Simuler le comportement du repository
        when(taskRepository.findById(1L)).thenReturn(Optional.of(task));

        // Appeler la méthode du service
        Task result = taskService.getTaskById(1L);

        // Vérifier les résultats
        assertNotNull(result);
        assertEquals("Task 1", result.getTitle());
        assertEquals(TaskStatus.TO_DO, result.getStatus());

        // Vérifier que la méthode findById a été appelée
        verify(taskRepository, times(1)).findById(1L);
    }

    @Test
    void testSaveTask() {
        // Préparer une tâche de test
        Task task = new Task("Task 1", "Description 1", TaskStatus.TO_DO);

        // Simuler le comportement du repository
        when(taskRepository.save(task)).thenReturn(task);

        // Appeler la méthode du service
        Task result = taskService.saveTask(task);

        // Vérifier les résultats
        assertNotNull(result);
        assertEquals("Task 1", result.getTitle());
        assertEquals(TaskStatus.TO_DO, result.getStatus());

        // Vérifier que la méthode save a été appelée
        verify(taskRepository, times(1)).save(task);
    }

    @Test
    void testDeleteTask() {
        // Appeler la méthode delete du service
        taskService.deleteTask(1L);

        // Vérifier que la méthode deleteById du repository a été appelée
        verify(taskRepository, times(1)).deleteById(1L);
    }
}