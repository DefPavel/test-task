import { TASKS_TOKENS } from 'src/common/constant';

import { TasksService } from './tasks.service';

export const tasksProviders = [
  {
    provide: TASKS_TOKENS.taskService,
    useClass: TasksService,
  },
];
