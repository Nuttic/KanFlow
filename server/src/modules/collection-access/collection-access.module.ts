import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AccessCollectionService } from './collection-access.service'
import { AccessCollectionController } from './collection-access.controller'
import { Collection_access } from '../../db/entities/collection_access.entity'

@Module({
    imports: [TypeOrmModule.forFeature([Collection_access])],
    controllers: [AccessCollectionController],
    providers: [AccessCollectionService],
    exports: [AccessCollectionService]
})
export class AccessCollectionModule {}