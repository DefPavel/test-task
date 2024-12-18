import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';

import { TaskEntity } from 'src/modules/tasks/entity/task.entity';

export default class TaskSeeder implements Seeder {
  public async run(_dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<any> {
    const userFactory = factoryManager.get(TaskEntity);

    await userFactory.save();

    await userFactory.saveMany(100);
  }
}
