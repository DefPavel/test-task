import { Injectable, Inject } from '@nestjs/common';
import { DataSource } from 'typeorm';

import { DATABASE_PROVIDER } from 'src/common/constant';

import { TaskEntity } from './entity/task.entity';

export interface ITaskService {
  getAll(limit: number, offset: number, searchQuery: string): Promise<TaskEntity[]>;
}

@Injectable()
export class TasksService implements ITaskService {
  constructor(@Inject(DATABASE_PROVIDER) private dataSource: DataSource) {}

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
}
