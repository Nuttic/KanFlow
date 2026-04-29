import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCollectionDTO } from './dto/create-collection.dto';
import { UpdateCollectionDTO } from './dto/update-collection.dto';
import { Collection } from '../../db/entities/collection.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
@Injectable()
export class CollectionService {
  constructor(
        @InjectRepository(Collection)
        private collectionRepository: Repository<Collection>,
      ){}



 async createCollection(body: CreateCollectionDTO): Promise<Collection> {
  const newCollection = await this.collectionRepository.create({
    type: body.type,
    title: body.title,
    description: body.description,
    color: body.color,
    team_: body.team_ ? { id: body.team_ } : null,
    user_: body.user_ ? { id: body.user_ } : null,
  });

  return this.collectionRepository.save(newCollection);
}


  async findAllByUser(user_id: number): Promise<Collection[]> {
    return this.collectionRepository.findBy({user_: {id: user_id}})
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} collection`;
  // }

  async updateCollection(id: number, body: UpdateCollectionDTO) {
    const foundCollection = await this.collectionRepository.findOne({where: {id: id}})
    if(!foundCollection){
      throw new NotFoundException('такой коллекции нема, попробуй снова')
    }
    this.collectionRepository.merge(foundCollection, body)
    return this.collectionRepository.save(foundCollection);
  }

  async deleteCollection(id: number) {
    const foundCollection = await this.collectionRepository.findOne({where: {id: id}})
    if (!foundCollection){
      throw new NotFoundException('такой коллекции нема, попробуй снова')
    }
    return this.collectionRepository.remove(foundCollection)
}
}