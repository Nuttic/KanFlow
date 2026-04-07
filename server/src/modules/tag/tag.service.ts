import { Injectable} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Tag } from '../../db/entities/tag.entity';
import { Repository } from 'typeorm';
import { CreateTagDto } from './dto/create-tag.dto';


@Injectable()
export class TagService {
constructor(
      @InjectRepository(Tag)
      private TagRepository: Repository<Tag>,
    ){}

    async createTag(body: CreateTagDto){
      const tag = this.TagRepository.create({...body})
      return this.TagRepository.save(tag)
    }

}
