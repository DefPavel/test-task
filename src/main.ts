import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as compression from 'compression';

import { AppModule } from './app.module';
import { CustomValidationPipe } from './common/pipes/validation.pipe';

async function bootstrap() {
  const logger = new Logger('Bootstrap');

  const app = await NestFactory.create(AppModule);
  const configService: ConfigService = app.get(ConfigService);
  const port = configService.get<number>('APP_PORT', 3000);

  const options = new DocumentBuilder()
    .setTitle('Swagger api')
    .setVersion('1.0')
    .addServer(`http://localhost:${port}`, 'Local application')
    .build();

  app.setGlobalPrefix('api/v1');
  app.enableCors();
  app.use(compression());
  app.useGlobalPipes(new CustomValidationPipe());

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('swagger', app, document);

  await app.listen(port);
  logger.log(`Application is running on http://localhost:${port}/swagger  ✅`);
}
bootstrap();
