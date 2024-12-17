import { Injectable, Inject } from '@nestjs/common';
import { DataSource, ILike } from 'typeorm';

import { DATABASE_TOKENS } from 'src/common/constant';

import { TaskEntity } from './entity/task.entity';

export interface ITaskService {
  getAll(limit: number, offset: number, searchQuery: string): Promise<TaskEntity[]>;
}

@Injectable()
export class TasksService implements ITaskService {
  constructor(@Inject(DATABASE_TOKENS.databaseProvide) private dataSource: DataSource) {}

  async getAll(limit: number, offset: number, searchQuery: string = ''): Promise<TaskEntity[]> {
    const userRepository = this.dataSource.getRepository(TaskEntity);
    const whereCondition = searchQuery ? { title: ILike(`%${searchQuery}%`) } : {};
    return userRepository.find({ take: limit, skip: offset, where: whereCondition });
  }
}
