import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from '../../db/entities/task.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Status, Difficult, } from "../../db/entities/task.entity";


@Injectable()
export class TasksService {
  constructor(
      @InjectRepository(Task)
      private tasksRepository: Repository<Task>,
    ){}

  async createTask(body: CreateTaskDto): Promise<Task> {
    const task = this.tasksRepository.create({
      ...body,
      creator_: {id: body.creator_},
      collection_: {id: body.collection_},
    })
    return this.tasksRepository.save(task)
  }

  async getAllTaskByCollection(collection_id): Promise<Task[]>{
    return await this.tasksRepository.findBy({collection_:{id: collection_id}})
  }

  async updateTask(id: number, updateTaskDto: UpdateTaskDto): Promise<Task>{
    const task = await this.tasksRepository.findOne({where: {id: id}})
    if(!task){
      throw new NotFoundException('Такой таски нема, попробуй снова')
    }
    const updatedTask = {
      ...updateTaskDto,
      executer_: updateTaskDto.executer_ ? {id: updateTaskDto.executer_} : undefined
    }
    this.tasksRepository.merge(task, updatedTask)
    return await this.tasksRepository.save(task)
  }

  async deleteTask(id: number) {
    const task = await this.tasksRepository.findOne({where: {id: id}})
    if(!task){
      throw new NotFoundException('Такой таски нема, попробуй снова')
    }
    return await this.tasksRepository.remove(task);
  }
}
