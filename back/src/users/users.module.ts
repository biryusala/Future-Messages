import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import User from './user.entity';
import { ConfigModule } from '@nestjs/config';
import {StripeModule} from "../stripe/stripe.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    StripeModule,
    ConfigModule
  ],
  providers: [UsersService],
  exports: [UsersService],
  controllers: []
})
export class UsersModule {}
