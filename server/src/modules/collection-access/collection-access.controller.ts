import { Controller, Post, Body, Get, Param, ParseIntPipe } from '@nestjs/common'
import { AccessCollectionService } from './collection-access.service'
import { CreateAccessCollection } from './dto/create-access-collection.dto'

@Controller('collection-access')
export class AccessCollectionController {
    constructor(private readonly accessService: AccessCollectionService) {}

    @Post()
    async upsert(@Body() body: CreateAccessCollection) {
        return await this.accessService.upsertAccess(body)
    }

    @Get(':collectionId/:userId')
    async getAccess(
        @Param('collectionId', ParseIntPipe) collectionId: number,
        @Param('userId', ParseIntPipe) userId: number
    ) {
        return await this.accessService.getUserAccessForCollection(collectionId, userId)
    }
}