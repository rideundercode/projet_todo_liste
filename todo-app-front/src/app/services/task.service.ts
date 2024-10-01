// task.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'; // Importation d'Observable
import { Task } from '../models/task';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private apiUrl = 'http://localhost:8081/api/tasks'; 

  constructor(private http: HttpClient) {}

   // Méthode pour récupérer les tâches
   getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.apiUrl}/all_tasks`);
  }

  // Méthode pour récupérer les statuts des tâches (Enum)
  getTaskStatuses(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/task-statuses`);
  }

    // Méthode pour ajouter une nouvelle tâche (POST)
    addTask(task: Partial<Task>): Observable<Task> {
      return this.http.post<Task>(this.apiUrl, task);
    }


  // Mettre à jour une tâche existante (PUT)
  updateTask(id: number, task: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, task);
  }

  // Supprimer une tâche (DELETE)
  deleteTask(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}