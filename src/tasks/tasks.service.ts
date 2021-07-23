import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { Task } from './task.entity';
import { TaskStatus } from './task.models';
import { TasksRepository } from './tasks.repository';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TasksRepository)
    private repository: TasksRepository,
  ) {}

  async getTasks(filterDto: GetTasksFilterDto): Promise<Task[]> {
    return await this.repository.getTasks(filterDto);
  }

  async getTaskById(id: string): Promise<Task> {
    const found = await this.repository.findOne(id);

    if (!found) {
      throw new NotFoundException(`Unable to find task with ID "${id}"`);
    }

    return found;
  }

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    return await this.repository.createTask(createTaskDto);
  }

  async deleteTask(id: string): Promise<void> {
    const { affected } = await this.repository.delete(id);

    if (affected === 0) {
      throw new NotFoundException(`Unable to find task with ID "${id}"`);
    }
  }

  async updateTaskStatus(id: string, status: TaskStatus): Promise<Task> {
    const task = await this.getTaskById(id);

    task.status = status;
    await this.repository.save(task);

    return task;
  }
}
