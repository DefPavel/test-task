import { Controller, Get, Inject, Query } from '@nestjs/common';

import { TASKS_TOKENS } from 'src/common/constant';

import { ITaskService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(
    @Inject(TASKS_TOKENS.taskService)
    private readonly tasksService: ITaskService,
  ) {}

  @Get('all')
  async getAll(
    @Query('limit') limit: number = 10,
    @Query('offset') offset: number = 0,
    @Query('searchQuery') searchQuery: string = '',
  ) {
    return this.tasksService.getAll(limit, offset, searchQuery);
  }
}
