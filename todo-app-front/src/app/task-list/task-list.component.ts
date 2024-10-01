import { Component, OnInit } from '@angular/core';
import { TaskService } from '../services/task.service';
import { Task } from '../models/task'; // Importer l'interface Task

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = []; // Utilisation de l'interface Task
  filteredTasks: Task[] = []; // Liste filtrée
  taskStatuses: string[] = []; // Tableau pour stocker les statuts récupérés

  newTaskStatus = 'TO_DO'; // Valeur par défaut pour le statut
  newTaskTitle = '';
  newTaskDescription = '';
  selectedStatus = '';
  sortCriteria = '';
  editIndex: number | null = null;
  editTaskTitle = '';
  editTaskDescription = '';
  editTaskStatus = '';

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.loadTasks();
    this.loadTaskStatuses(); // Charger les statuts à partir du backend
  }

  // Charger toutes les tâches via le backend
  loadTasks() {
    this.taskService.getTasks().subscribe({
      next: (data) => {
        this.tasks = data;
        this.filteredTasks = [...this.tasks];
      },
      error: (error) => {
        console.error('Erreur lors du chargement des tâches', error);
      }
    });
  }
  
  // Charger les statuts des tâches depuis le backend
  loadTaskStatuses() {
    this.taskService.getTaskStatuses().subscribe({
      next: (statuses) => {
        this.taskStatuses = statuses; // Stocker les statuts dans taskStatuses
      },
      error: (error) => {
        console.error('Erreur lors du chargement des statuts', error);
      }
    });
  }

  // Ajouter une nouvelle tâche
  addTask() {
    if (this.newTaskTitle && this.newTaskDescription) {
      const newTask: Partial<Task> = {
        title: this.newTaskTitle,
        description: this.newTaskDescription,
        status: this.newTaskStatus, // Utilisation de la nouvelle variable
      };
  
      this.taskService.addTask(newTask).subscribe({
        next: () => {
          this.loadTasks(); // Recharger les tâches après ajout
          this.newTaskTitle = '';
          this.newTaskDescription = '';
          this.newTaskStatus = 'TO_DO'; // Réinitialiser le statut par défaut
        },
        error: (error) => {
          console.error("Erreur lors de l'ajout de la tâche", error);
        }
      });
    }
  }

  // Supprimer une tâche via le backend
  deleteTask(index: number) {
    const taskId = this.tasks[index].id; // TypeScript sait maintenant que id existe
    this.taskService.deleteTask(taskId).subscribe({
      next: () => this.loadTasks(),
      error: (error) => {
        console.error('Erreur lors de la suppression de la tâche', error);
      }
    });
  }

  // Modifier une tâche existante
  startEditTask(index: number) {
    this.editIndex = index;
    this.editTaskTitle = this.tasks[index].title;
    this.editTaskDescription = this.tasks[index].description;
    this.editTaskStatus = this.tasks[index].status;
  }

  updateTask(index: number) {
    if (this.editTaskTitle && this.editTaskDescription) {
      const updatedTask: Partial<Task> = {
        title: this.editTaskTitle,
        description: this.editTaskDescription,
        status: this.editTaskStatus, // Utilisation de l'option sélectionnée qui est TO_DO, IN_PROGRESS ou DONE
      };

      const taskId = this.tasks[index].id;
      this.taskService.updateTask(taskId, updatedTask).subscribe({
        next: () => {
          this.loadTasks(); // Recharger les tâches après mise à jour
          this.cancelEdit();
        },
        error: (error) => {
          console.error('Erreur lors de la mise à jour de la tâche', error);
        }
      });
    }
  }

  cancelEdit() {
    this.editIndex = null;
    this.editTaskTitle = '';
    this.editTaskDescription = '';
    this.editTaskStatus = '';
  }

  // Filtrer les tâches par statut
// Filtrer les tâches par statut
filterTasks() {
  if (this.selectedStatus) {
    this.filteredTasks = this.tasks.filter(task => task.status === this.selectedStatus);
  } else {
    this.filteredTasks = [...this.tasks]; // Si aucun statut sélectionné, afficher toutes les tâches
  }
}


  // Trier les tâches par titre ou statut
  sortTasks() {
    if (this.sortCriteria === 'title') {
      this.filteredTasks.sort((a, b) => a.title.localeCompare(b.title));
    } else if (this.sortCriteria === 'status') {
      this.filteredTasks.sort((a, b) => a.status.localeCompare(b.status));
    }
  }
}
