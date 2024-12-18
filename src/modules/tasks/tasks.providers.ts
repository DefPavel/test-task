import { TASKS_SERVICE } from 'src/common/constant';

import { TasksService } from './tasks.service';

export const tasksProviders = [
  {
    provide: TASKS_SERVICE,
    useClass: TasksService,
  },
];
