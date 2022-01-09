import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import CustomLogger from './logger/customLogger';
import rawBodyMiddleware from "./utils/rawBody.middleware";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });
  app.useLogger(app.get(CustomLogger));
  app.useGlobalPipes(new ValidationPipe({
    transform: true
  }));
  app.use(cookieParser());

  const configService = app.get(ConfigService);

  app.enableCors({
    origin: configService.get('FRONTEND_URL'),
    credentials: true
  });

  app.use(rawBodyMiddleware());

  await app.listen(3000);
}
bootstrap();
