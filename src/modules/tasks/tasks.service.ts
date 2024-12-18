import {
  Injectable,
  Inject,
  Logger,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { DataSource } from 'typeorm';

import { DATABASE_PROVIDER } from 'src/common/constant';

import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskEntity } from './entity/task.entity';

export interface ITaskService {
  getAll(limit: number, offset: number, searchQuery: string): Promise<TaskEntity[]>;
  create(payload: CreateTaskDto): Promise<CreateTaskDto>;
  update(id: string, payload: UpdateTaskDto): Promise<TaskEntity>;
  remove(id: string): Promise<TaskEntity>;
}

@Injectable()
export class TasksService implements ITaskService {
  constructor(@Inject(DATABASE_PROVIDER) private dataSource: DataSource) {}

  private readonly logger = new Logger(TasksService.name);

  async getAll(limit: number, offset: number, searchQuery: string = ''): Promise<TaskEntity[]> {
    const queryBuilder = this.dataSource.getRepository(TaskEntity).createQueryBuilder('tasks');
    queryBuilder
      .select([
        'tasks.id AS id',
        'tasks.title AS title',
        'tasks.createdAt AS "createdAt"',
        'tasks.updatedAt AS "updatedAt"',
      ])
      // Получаем разницу в днях между createdAt и updatedAt и называем поле 'difference'
      .addSelect(
        `COALESCE(ABS(DATE_PART('day', tasks.updatedAt - tasks.createdAt)), 0) AS difference`,
      )
      .where('tasks.deletedAt IS NULL');

    if (searchQuery.trim()) {
      queryBuilder.andWhere('tasks.title ILIKE :searchQuery', {
        searchQuery: `%${searchQuery}%`,
      });
    }
    queryBuilder.orderBy('tasks.createdAt', 'DESC').skip(offset).take(limit);

    return queryBuilder.getRawMany();
  }

  async create(payload: CreateTaskDto) {
    const taskRepository = this.dataSource.getRepository(TaskEntity);
    try {
      await taskRepository.save(payload);
      return payload;
    } catch (error) {
      this.logger.error(`Ошибка при создании записи. Ошибка: ${error.message || error}`);
      throw new InternalServerErrorException(
        `Не удалось создать запись. Пожалуйста, попробуйте снова.`,
      );
    }
  }

  async update(id: string, payload: UpdateTaskDto) {
    const taskRepository = this.dataSource.getRepository(TaskEntity);
    try {
      const findTask = await taskRepository.findOneBy({ id: id });
      if (!findTask) {
        this.logger.error(`Запись c id: ${id} не найдена!`);
        throw new NotFoundException(`Запись с id: ${id} не найдена!`);
      }

      findTask.title = payload.title || findTask.title;
      findTask.updatedAt = new Date(); // Обновить дату изменения

      await taskRepository.save(findTask);
      return findTask;
    } catch (error) {
      if (error instanceof NotFoundException) {
        this.logger.error(error.message);
        throw error;
      }
      this.logger.error(
        `Ошибка при обновлении записи с id: ${id}. Ошибка: ${error.message || error}`,
      );
      throw new InternalServerErrorException(
        `Не удалось обновить запись с id: ${id}. Пожалуйста, попробуйте снова.`,
      );
    }
  }

  async remove(id: string) {
    const taskRepository = this.dataSource.getRepository(TaskEntity);
    try {
      const findTask = await taskRepository.findOneBy({ id: id });
      if (!findTask) {
        this.logger.error(`Запись c id: ${id} не найдена!`);
        throw new NotFoundException(`Запись с id: ${id} не найдена!`);
      }

      findTask.deletedAt = new Date(); // Обновить дату удаления
      await taskRepository.save(findTask);
      return findTask;
    } catch (error) {
      if (error instanceof NotFoundException) {
        this.logger.error(error.message);
        throw error;
      }
      this.logger.error(
        `Ошибка при удалении записи с id: ${id}. Ошибка: ${error.message || error}`,
      );
      throw new InternalServerErrorException(
        `Не удалось удалить запись с id: ${id}. Пожалуйста, попробуйте снова.`,
      );
    }
  }
}
