import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Comment } from '../../db/entities/comment.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCollectionDTO } from '../collection/dto/create-collection.dto';

@Injectable()
export class CommentService {
   constructor(
        @InjectRepository(Comment)
        private commentRepository: Repository<Comment>,
      ){}
  async createComment(body: CreateCommentDto) {
    const newComment = await this.commentRepository.create({
      ...body,
      creator_: {id: body.creator_},
      task_: {id: body.task_}
    })
    return this.commentRepository.save(newComment);
  }

  // findAll() {
  //   return `This action returns all comment`;
  // }


  async findAllByTask(task_id: number) {
    return this.commentRepository.findBy({task_: {id: task_id}})
  }

  async updateComment(id: number, body: UpdateCommentDto) {
    const foundComment = await this.commentRepository.findOne({where: {id: id}})
    if(!foundComment){
      throw new NotFoundException('такого коммента нема, попробуй снова')
    }
    this.commentRepository.merge(foundComment, body)
    return this.commentRepository.save(foundComment);
  }

  async deleteComment(id: number) {
    const foundComment = await this.commentRepository.findOne({where: {id: id}})
    if(!foundComment){
      throw new NotFoundException('такого коммента нема, попробуй снова')
    }
    return this.commentRepository.remove(foundComment)
  }
}
