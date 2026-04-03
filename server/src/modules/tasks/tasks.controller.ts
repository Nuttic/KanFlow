import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode,
  HttpStatus, NotFoundException,  BadRequestException,
  ParseIntPipe} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post('createTask')
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() body: CreateTaskDto,){
    try {
     const newTask = await this.tasksService.createTask(body)
     return newTask
    } catch (error) {
      throw new BadRequestException('Таска отказалась с вами работать')
    }
  }

  @Get(':collection_id')
  async getAllTasksFromCollection(@Param('collection_id', ParseIntPipe) collection_id: number) {
    return await this.tasksService.getAllTaskByCollection(collection_id)
  }

  @Patch(':id')
  async updateTask(@Param('id', ParseIntPipe) id: number, @Body() updateInfo: UpdateTaskDto) {
    return await this.tasksService.updateTask(id, updateInfo)
  }

  @Delete(':id')
  async deleteTask(@Param('id', ParseIntPipe) id: number) {
    return this.tasksService.deleteTask(id)
  }
}
