import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from '@hapi/joi';
import { DatabaseModule } from './database/database.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { UsersModule } from './users/users.module';
import { ScheduleModule } from '@nestjs/schedule';
import { EmailSchedulingModule } from './emailScheduling/emailScheduling.module';
<<<<<<< HEAD
=======
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
>>>>>>> c0558a6044417b1aa78966af43d49053725e747f
import { Timestamp } from './utils/scalars/timestamp.scalar';
import { BullModule } from '@nestjs/bull';
import { EmailConfirmationModule } from './emailConfirmation/emailConfirmation.module';
import { GoogleAuthenticationModule } from './googleAuthentication/googleAuthentication.module';
import LogsMiddleware from './utils/logs.middleware';
import { LoggerModule } from './logger/logger.module';
<<<<<<< HEAD
=======
import { DatabaseFilesModule } from './databaseFiles/databaseFiles.module';
>>>>>>> c0558a6044417b1aa78966af43d49053725e747f

@Module({
  imports: [
    BullModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        redis: {
          host: configService.get('REDIS_HOST'),
          port: Number(configService.get('REDIS_PORT')),
        },
      }),
      inject: [ConfigService],
    }),
    ScheduleModule.forRoot(),
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        DB_HOST: Joi.string().required(),
        DB_PORT: Joi.number().required(),
        DB_USER: Joi.string().required(),
        DB_PASSWORD: Joi.string().required(),
        DB_NAME: Joi.string().required(),
        JWT_ACCESS_TOKEN_SECRET: Joi.string().required(),
        JWT_ACCESS_TOKEN_EXPIRATION_TIME: Joi.string().required(),
        JWT_REFRESH_TOKEN_SECRET: Joi.string().required(),
        JWT_REFRESH_TOKEN_EXPIRATION_TIME: Joi.string().required(),
        PORT: Joi.number()
      })
    }),
    DatabaseModule,
    AuthenticationModule,
    UsersModule,
    EmailSchedulingModule,
<<<<<<< HEAD
    EmailConfirmationModule,
    GoogleAuthenticationModule,
    LoggerModule,
=======
    OptimizeModule,
    EmailConfirmationModule,
    GoogleAuthenticationModule,
    LoggerModule,
    DatabaseFilesModule,
>>>>>>> c0558a6044417b1aa78966af43d49053725e747f
  ],
  controllers: [],
  providers: [Timestamp],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LogsMiddleware)
      .forRoutes('*');
  }
}
