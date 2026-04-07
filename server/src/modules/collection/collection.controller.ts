import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { CollectionService } from './collection.service';
import { CreateCollectionDTO } from './dto/create-collection.dto';
import { UpdateCollectionDTO } from './dto/update-collection.dto';
import { Collection } from '../../db/entities/collection.entity';

@Controller('collection')
export class CollectionController {
  constructor(private readonly collectionService: CollectionService) {}

  @Post()
  async create(@Body() createCollectionDto: CreateCollectionDTO): Promise<Collection> {
    return this.collectionService.createCollection(createCollectionDto);
  }

  // @Get()
  // findAll() {
  //   return this.collectionService.findAll();
  // }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.collectionService.findAllByUser(id);
  }

  // @Patch(':id')
  // update(@Param('id', ParseIntPipe) id: number, @Body() updateCollectionDto: UpdateCollectionDTO) {
  //   return this.collectionService.update(id, updateCollectionDto);
  // }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return this.collectionService.deleteCollection(id);
  }
}
