import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Collection } from '../../db/entities/collection.entity'; // Ваша сущность
import { CollectionService } from './collection.service';
import { CollectionController } from './collection.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Collection]),
  ],
  providers: [CollectionService],
  controllers: [CollectionController],
})
export class CollectionModule {}
