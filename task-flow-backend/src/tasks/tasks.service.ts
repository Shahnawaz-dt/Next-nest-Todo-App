import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';

@Injectable()
export class TasksService {
  // Initialize as an empty array with a generic 'any' or 'Task' type
  private tasks: any[] = []; 

  create(createTaskDto: CreateTaskDto) {
    const newTask = {
      id: Date.now().toString(),
      ...createTaskDto,
      status: 'OPEN',
    };
    
    this.tasks.push(newTask);
    return newTask;
  }
  // task-flow-backend/src/tasks/tasks.service.ts

  deleteTask(id: string): void {
    this.tasks = this.tasks.filter(task => task.id !== id);
  }

  updateTaskStatus(id: string, status: string) {
    const task = this.tasks.find(t => t.id === id);
    if (task) {
      task.status = status;
    }
    return task;
  }

  findAll() {
    return this.tasks;
  }
}