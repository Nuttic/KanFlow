import { Module } from '@nestjs/common';
import { DatabaseModule } from './db/database/database.module';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { TasksModule } from './modules/tasks/tasks.module';
import { CollectionModule } from './modules/collection/collection.module';
import { CommentModule } from './modules/comment/comment.module';
import { TeamModule } from './modules/team/team.module';
import { UserToTeamModule } from './modules/user_to_team/user_to_team.module';
import { AccessCollectionModule } from './modules/collection-access/collection-access.module';

@Module({
    imports: [
        DatabaseModule,
        AuthModule,
        UsersModule,
        TasksModule,
        CollectionModule,
        CommentModule,
        TeamModule,
        UserToTeamModule,
        AccessCollectionModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}

