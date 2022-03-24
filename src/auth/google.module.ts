import { Module } from '@nestjs/common';
import { GoogleService } from './google.service';
import { GoogleController } from './google.controller';
import { GoogleStrategy } from './google.strategy';
import { UserModule } from './../user/user.module';
import { AuthModule } from './auth.module';
import { PlanModule } from 'src/plan/plan.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [UserModule, AuthModule, PlanModule, ConfigModule],
  controllers: [GoogleController],
  providers: [GoogleStrategy, GoogleService],
})
export class GoogleModule {}
