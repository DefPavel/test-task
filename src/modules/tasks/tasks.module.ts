import { Module } from '@nestjs/common';

import { DatabaseModule } from 'src/database/database.module';

import { TasksController } from './tasks.controller';
import { tasksProviders } from './tasks.providers';

@Module({
  imports: [DatabaseModule],
  providers: [...tasksProviders],
  controllers: [TasksController],
})
export class TasksModule {}
