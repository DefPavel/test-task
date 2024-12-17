import { ConfigService } from '@nestjs/config';
import { DataSource, DataSourceOptions } from 'typeorm';
import { runSeeders, SeederOptions } from 'typeorm-extension';

import { DATABASE_TOKENS } from 'src/common/constant';
import { TaskEntity } from 'src/modules/tasks/entity/task.entity';

import taskFactory from './factories/task.factory';
import InitSeeder from './seeds/init.seeder';

export const databaseProviders = [
  {
    provide: DATABASE_TOKENS.databaseProvide,
    useFactory: async (configService: ConfigService) => {
      const options: DataSourceOptions & SeederOptions = {
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: 5432,
        username: configService.get<string>('DB_USER'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),
        entities: [TaskEntity],
        migrations: [__dirname + '/../migrations/**/*.ts'],
        synchronize: false,
        logging: true,
        poolSize: 50,
        factories: [taskFactory],
        seeds: [InitSeeder],
      };

      const dataSource = new DataSource(options);

      dataSource.initialize().then(async () => {
        await dataSource.synchronize(true);
        // после инициализации запуск seeds
        await runSeeders(dataSource);
      });
      return dataSource;
    },
    inject: [ConfigService],
  },
];
