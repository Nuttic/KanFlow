import { Module } from '@nestjs/common';
import { TeamService } from './team.service';
import { TeamController } from './team.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Team } from '../../db/entities/team.entity';
import { AccessService } from '../user_to_team/user_to_team.service';
import { AccessController } from '../user_to_team/user_to_team.controller';
import { User_to_team_access } from '../../db/entities/user_to_team_access.entity';

@Module({
imports: [TypeOrmModule.forFeature([Team, User_to_team_access])],
    controllers: [TeamController, AccessController],
    providers: [TeamService, AccessService],
    exports: [TeamService, AccessService],
})
export class TeamModule {}
