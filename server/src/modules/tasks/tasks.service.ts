import { Injectable, NotFoundException } from '@nestjs/common'
import { CreateTaskDto } from './dto/create-task.dto'
import { UpdateTaskDto } from './dto/update-task.dto'
import { Task } from '../../db/entities/task.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { TasksGateway } from './tasks.gateway'

@Injectable()
export class TasksService {
  constructor(
      @InjectRepository(Task)
      private tasksRepository: Repository<Task>,
      private tasksGateway: TasksGateway,
    ){}

  async createTask(body: CreateTaskDto): Promise<Task> {
    const task = this.tasksRepository.create({
      ...body,
      creator_: {id: body.creator_},
      collection_: {id: body.collection_},
    })
    const savedTask = await this.tasksRepository.save(task)

    this.tasksGateway.server
      .to(`collection_${body.collection_}`)
      .emit('taskCreated', savedTask)
    return savedTask
  }

  async getAllTaskByCollection(collection_id): Promise<Task[]>{
    return await this.tasksRepository.findBy({collection_:{id: collection_id}})
  }

 async updateTask(id: number, updateTaskDto: UpdateTaskDto) {
  const task = await this.tasksRepository.findOne({ 
    where: { id },
    relations: ['collection_']
  })

  if (!task) {
    throw new NotFoundException(`Task with ID ${id} not found`);
  }


  const { executer_, ...restUpdateData } = updateTaskDto;

  const updatedData: any = { ...restUpdateData }

  if (executer_ !== undefined) {
    updatedData.executer_ = executer_ === null ? null : { id: executer_ }
  }

  this.tasksRepository.merge(task, updatedData)
  const savedTask = await this.tasksRepository.save(task)

  if (savedTask.collection_) {
    this.tasksGateway.server
      .to(`collection_${savedTask.collection_.id}`)
      .emit('taskUpdated', savedTask)
  }

  return savedTask
}

  async deleteTask(id: number) {
    const task = await this.tasksRepository.findOne({
        where: {id: id},
        relations: ['collection_']
    })
    if(!task){
      throw new NotFoundException('Такой таски нема, попробуй снова')
    }

    await this.tasksRepository.remove(task)

    if (task.collection_) {
      this.tasksGateway.server
        .to(`collection_${task.collection_.id}`)
        .emit('taskDeleted', { id })
    }

    return { message: 'Task deleted successfully' }
  }
}