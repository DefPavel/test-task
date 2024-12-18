import { Controller, Get, Inject, Query } from '@nestjs/common';
import { ApiQuery } from '@nestjs/swagger';

import { TASKS_SERVICE } from 'src/common/constant';

import { TasksQueryDto } from './dto/query-task.dto';
import { ITaskService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(
    @Inject(TASKS_SERVICE)
    private readonly tasksService: ITaskService,
  ) {}

  @Get('all')
  @ApiQuery({
    name: 'limit',
    type: Number,
    required: false,
    description: 'Максимальное количество записей',
    example: 10,
  })
  @ApiQuery({
    name: 'offset',
    type: Number,
    required: false,
    description: 'Количество пропускаемых записей',
    example: 0,
  })
  @ApiQuery({
    name: 'searchQuery',
    type: String,
    required: false,
    description: 'Подстрока для поиска',
    example: '',
  })
  async getAll(@Query() query: TasksQueryDto) {
    const { limit, offset, searchQuery } = query;
    return this.tasksService.getAll(limit, offset, searchQuery);
  }
}
