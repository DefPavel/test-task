import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiQuery } from '@nestjs/swagger';

import { TASKS_SERVICE } from 'src/common/constant';

import { CreateTaskDto } from './dto/create-task.dto';
import { TasksQueryDto } from './dto/query-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { ITaskService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(
    @Inject(TASKS_SERVICE)
    private readonly tasksService: ITaskService,
  ) {}

  @Get()
  @ApiOperation({
    summary: 'Получить все записи',
    description: 'Позволяет получить все записи.',
  })
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

  @Post()
  @ApiOperation({
    summary: 'Создать запись',
    description: 'Позволяет создать новую запись.',
  })
  @ApiBody({
    description: 'Данные для создания новой записи',
    type: CreateTaskDto,
    examples: {
      example1: {
        summary: 'Пример задачи',
        value: {
          title: 'Новая задача',
          description: 'Описание новой задачи',
        },
      },
    },
  })
  async create(@Body() createTaskDto: CreateTaskDto) {
    return this.tasksService.create(createTaskDto);
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Изменить запись',
    description: 'Позволяет изменить запись.',
  })
  @ApiBody({
    description: 'Данные для создания новой записи',
    type: UpdateTaskDto,
    examples: {
      example1: {
        summary: 'Пример задачи',
        value: {
          title: 'Изменить задачу',
          description: 'Изменить задачи',
        },
      },
    },
  })
  async update(@Param('id', ParseUUIDPipe) id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return this.tasksService.update(id, updateTaskDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Удалить запись',
    description: 'Позволяет удалить запись.',
  })
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.tasksService.remove(id);
  }
}
