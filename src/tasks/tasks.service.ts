import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import * as uuid from 'uuid/v1';
import { CreateTaskDto } from './dto/create-task.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  getFilterTasks(filterDto): Task[] {
    const { status, search } = filterDto;
    let tasks = this.tasks;

    if (status) {
      tasks = tasks.filter(e => e.status === status);
    }

    if (search) {
      tasks = tasks.filter(
        e => e.title.includes(search) || e.description.includes(search),
      );
    }

    return tasks;
  }

  getTaskById(id: string): Task {
    const response = this.tasks.find(e => e._id === id);
    if (!response) {
      throw new NotFoundException();
    }
    return response;
  }

  deleteTaskById(id: string): Task[] {
    const task = this.getTaskById(id);

    this.tasks = this.tasks.filter(e => e._id !== task._id);
    return this.tasks;
  }

  patchTaskById(id: string, status: TaskStatus) {
    const task = this.getTaskById(id);
    task.status = status;
    return task;
  }

  createTask(createTaskDto: CreateTaskDto): Task {
    const { title, description } = createTaskDto;

    const task: Task = {
      _id: uuid(),
      title,
      description,
      status: TaskStatus.OPEN,
    };
    this.tasks.push(task);
    return task;
  }
}
