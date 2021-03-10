import { Injectable } from '@angular/core';
import { Task } from '../../interfaces/task';

@Injectable({
  providedIn: 'root'
})
export class TaskDataService {
  public tasks!: { [id: string]: Task };
  public tasksMap: Map<Date, Task[]> = new Map<Date, Task[]>([]);

  public setTasks(tasks: { [id: string]: Task }): void {
    this.tasks = tasks;
  }

  public getCurrentTasks(day: Date): { [id: string]: Task } {
    const currentTasks: { [id: string]: Task } = {};
    for (const key in this.tasks) {
      if (this.tasks[key]?.date.toDateString() === day.toDateString()) {
        currentTasks[key] = this.tasks[key];
      }
    }
    return currentTasks;
  }

  public setTaskToMap(day: Date): void {
    this.tasksMap.delete(day);
    const taskArray: Task[] = Object.values(this.getCurrentTasks(day));
    if (taskArray.length > 0) {
      this.tasksMap.set(day, taskArray);
    }
  }

  public deleteTask(key: string): void {
    delete this.tasks[key];
  }

  public deleteTasks(): void {
    this.tasks = {};
    this.tasksMap.clear();
  }
}
