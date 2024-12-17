import { DataSource } from 'typeorm';
import { runSeeders, Seeder } from 'typeorm-extension';

import TaskSeeder from './task.seeder';
import taskFactory from '../factories/task.factory';

export default class InitSeeder implements Seeder {
  public async run(dataSource: DataSource): Promise<any> {
    await runSeeders(dataSource, {
      seeds: [TaskSeeder],
      factories: [taskFactory],
    });
  }
}
