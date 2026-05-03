import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Comment } from '../../db/entities/comment.entity';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post()
  async create(@Body() body: CreateCommentDto): Promise<Comment>{
    return this.commentService.createComment(body)
  }

  // @Get()
  // findAll() {
  //   return this.commentService.findAll();
  // }

  @Get(':task_id')
  async findByTaskId(@Param('task_id', ParseIntPipe) task_id: number): Promise<Comment[]> {
    return this.commentService.findAllByTask(task_id)
  }

  @Patch(':id')
  async updateComment(@Param('id', ParseIntPipe) id: number, @Body() new_body: UpdateCommentDto): Promise<Comment> {
    return this.commentService.updateComment(id, new_body)
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.commentService.deleteComment(id)
  }
}
