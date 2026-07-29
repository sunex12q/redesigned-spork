import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
  ) {}

  create(createTaskDto: CreateTaskDto, userId: number): Promise<Task> {
    const newTask = this.tasksRepository.create({
      ...createTaskDto,
      user: { id: userId },
    });
    return this.tasksRepository.save(newTask);
  }

  findAll(userId: number): Promise<Task[]> {
    return this.tasksRepository.find({ where: { user: { id: userId } } });
  }

  findOne(id: number, userId: number): Promise<Task | null> {
    return this.tasksRepository.findOneBy({ id, user: { id: userId } });
  }

  async update(id: number, updateTaskDto: UpdateTaskDto, userId: number): Promise<Task | null> {
    await this.tasksRepository.update({ id, user: { id: userId } }, updateTaskDto);
    return this.findOne(id, userId);
  }

  async remove(id: number, userId: number): Promise<void> {
    await this.tasksRepository.delete({ id, user: { id: userId } });
  }
}
