import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import * as compression from 'compression';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');
  app.use(compression());

  const configService: ConfigService = app.get(ConfigService);
  await app.listen(configService.get('APP_PORT') || 3000);

  console.log(configService.get('APP_PORT'));
}
bootstrap();
