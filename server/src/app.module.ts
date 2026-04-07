import { Module } from '@nestjs/common';
import { DatabaseModule } from './db/database/database.module';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { TasksModule } from './modules/tasks/tasks.module';
import { CollectionModule } from './modules/collection/collection.module';

@Module({
    imports: [
        DatabaseModule,
        AuthModule,
        UsersModule,
        TasksModule,
        CollectionModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}

