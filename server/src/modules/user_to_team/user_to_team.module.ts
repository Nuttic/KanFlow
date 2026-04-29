import { Module } from '@nestjs/common';
import { AccessService } from './user_to_team.service';
import { AccessController } from './user_to_team.controller';
import { User_to_team_access } from '../../db/entities/user_to_team_access.entity';
import { Team } from '../../db/entities/team.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    // ВАЖНО: Регистрируем репозитории для этого модуля
    TypeOrmModule.forFeature([User_to_team_access, Team])
  ],
  controllers: [AccessController],
  providers: [AccessService],
})
export class UserToTeamModule {}
