import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {User} from '../entities/user.entity'
import { User_to_team_access } from '../entities/user_to_team_access.entity';
import { Team } from '../entities/team.entity';
import { Task } from '../entities/task.entity';
import { Tag } from '../entities/tag.entity';
import { Task_tag } from '../entities/task_tag.entity';
import { Collection } from '../entities/collection.entity';
import { Collection_access } from '../entities/collection_access.entity';
import { Comment } from '../entities/comment.entity';



@Module({imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'KanFlow_test',
      entities: [User, User_to_team_access, Team, Task, Tag, Task_tag, Collection, Collection_access, Comment],
      synchronize: true,
      logging: true,
    }),
  ],
})
export class DatabaseModule {}
