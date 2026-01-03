import { Controller, Get, Delete, Patch, Param, Post, Body } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';

@Controller('tasks') // This means the route is http://localhost:3000/tasks
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  create(@Body() createTaskDto: CreateTaskDto) {
    return this.tasksService.create(createTaskDto);
  }

  @Get()
  findAll() {
    return this.tasksService.findAll();
  }

  // task-flow-backend/src/tasks/tasks.controller.ts

@Delete('/:id')
deleteTask(@Param('id') id: string): void {
  return this.tasksService.deleteTask(id);
}

@Patch('/:id/status')
updateTaskStatus(
  @Param('id') id: string,
  @Body('status') status: string,
) {
  return this.tasksService.updateTaskStatus(id, status);
}
}