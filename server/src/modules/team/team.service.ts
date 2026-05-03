import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Team } from '../../db/entities/team.entity';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';

@Injectable()
export class TeamService {
    constructor(
        @InjectRepository(Team)
        private readonly teamRepo: Repository<Team>,
    ) {}

    async create(dto: CreateTeamDto): Promise<Team> {
      const foundTeam = await this.teamRepo.findOneBy({ team_name: dto.team_name})
      if (foundTeam) {
        throw new ConflictException(`Команда с именем "${dto.team_name}" уже существует`)
    }
        const team = this.teamRepo.create(dto)
        return this.teamRepo.save(team)
    }

    async findAll() {
        return await this.teamRepo.find({ relations: ['user_to_team'] })
    }

    async findOne(id: number) {
        const team = await this.teamRepo.findOne({
            where: { id },
            relations: ['user_to_team', 'user_to_team.user_'],
        });
        if (!team) throw new NotFoundException(`Команда с ID ${id} не найдена`)
        return team
    }

    async update(id: number, dto: UpdateTeamDto) {
      const foundTeam = await this.teamRepo.findOne({where: {id: id}})
      if(!foundTeam){throw new NotFoundException('такой тимы нема')}
      this.teamRepo.merge(foundTeam, dto)
      return this.teamRepo.save(foundTeam)
    }

    async remove(id: number) {
      const foundTeam = await this.teamRepo.findOne({where: {id: id}})
      if(!foundTeam){throw new NotFoundException('такой тимы нема')}
      return this.teamRepo.remove(foundTeam)
    }
}