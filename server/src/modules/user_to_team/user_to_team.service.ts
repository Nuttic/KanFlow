// access.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User_to_team_access } from '../../db/entities/user_to_team_access.entity';
import { CreateAccessDto } from './dto/create-userToTeam.dto';
import { UpdateAccessDto } from './dto/update-userToTeam.dto'

@Injectable()
export class AccessService {
    constructor(
        @InjectRepository(User_to_team_access)
        private readonly accessRepo: Repository<User_to_team_access>,
    ) {}

    async create(dto: CreateAccessDto) {
        const newAccess = this.accessRepo.create({
            user_: { id: dto.userId },
            team_: { id: dto.teamId },
            access: dto.access,
        });
        return await this.accessRepo.save(newAccess);
    }

    async findAll() {
        return await this.accessRepo.find({ relations: ['user_', 'team_'] });
    }

    async findOne(id: number) {
        const access = await this.accessRepo.findOne({
            where: { id },
            relations: ['user_', 'team_'],
        });
        if (!access) throw new NotFoundException(`Запись доступа с ID ${id} не найдена`);
        return access;
    }

async update(id: number, dto: UpdateAccessDto) {
    const accessRecord = await this.accessRepo.findOne({ where: { id } });
    if (!accessRecord) {
        throw new NotFoundException(`Запись доступа с ID ${id} не найдена`);
    }
    this.accessRepo.merge(accessRecord, dto);
    return await this.accessRepo.save(accessRecord);
}

    async remove(id: number) {
    const accessRecord = await this.findOne(id);
    return await this.accessRepo.remove(accessRecord);
    }
}