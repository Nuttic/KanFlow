import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { AccessService } from './user_to_team.service';
import { CreateAccessDto } from './dto/create-userToTeam.dto';
import { UpdateAccessDto } from './dto/update-userToTeam.dto';

@Controller('team-access')
export class AccessController {
    constructor(private readonly accessService: AccessService) {}

    @Post()
    async create(@Body() dto: CreateAccessDto) {
        return this.accessService.create(dto);
    }

    @Get()
    async findAll() {
        return this.accessService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id: number) {
        return this.accessService.findOne(id);
    }

    @Patch(':id')
    async update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateAccessDto) {
        return this.accessService.update(id, dto);
    }

    @Delete(':id')
    async remove(@Param('id', ParseIntPipe) id: number) {
        return this.accessService.remove(id);
    }
}