import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'; // Импортируем TypeOrmModule
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from '../../db/entities/user.entity'; // Импортируем вашу сущность

@Module({
  imports: [
    TypeOrmModule.forFeature([User]), 
  ],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService], // Экспортируйте, если AuthService (в другом модуле) его использует
})
export class UsersModule {}