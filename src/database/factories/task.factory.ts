import { Faker, ru } from '@faker-js/faker';
import { setSeederFactory } from 'typeorm-extension';

import { TaskEntity } from 'src/modules/tasks/entity/task.entity';

export default setSeederFactory(TaskEntity, async (faker) => {
  const task = new TaskEntity();

  task.id = faker.string.uuid();
  task.title = new Faker({ locale: [ru] }).lorem.sentence(3);
  task.createdAt = faker.date.anytime();
  task.updatedAt = faker.date.anytime();

  return task;
});
