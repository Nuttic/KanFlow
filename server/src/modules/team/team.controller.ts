
import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { TeamService } from './team.service';
import { CreateTeamDto} from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto'

@Controller('teams')
export class TeamController {
    constructor(private readonly teamService: TeamService) {}

    @Post()
    async create(@Body() dto: CreateTeamDto) { return this.teamService.create(dto) }

    @Get()
    async findAll() { return this.teamService.findAll() }

    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id: number) { return this.teamService.findOne(id) }

    @Patch(':id')
    async update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateTeamDto) { return this.teamService.update(id, dto) }

    @Delete(':id')
    async remove(@Param('id', ParseIntPipe) id: number) { return this.teamService.remove(id) }
}