import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { configuration } from '../configuration';
import { UserModule } from './user/user.module';
import { PlanModule } from './plan/plan.module';
import { GoogleModule } from './auth/google.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './auth/constants';
import { AuthModule } from './auth/auth.module';

/**
 * Set the used port in the constructor
 */
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `${process.cwd()}/configuration/env/${process.env.NODE_ENV?.trim() || 'development'}.env`,
      load: [configuration]
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('mongodbUri')
      }),
      inject: [ConfigService],
    }),
    GoogleModule,
    AuthModule,
    PassportModule,
    UserModule,
    PlanModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '2 days' },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  static port: number | string;
  
  /**
   * @param configurationService - [readonly] Used to retrieve the port number
   */
  constructor(private readonly configService: ConfigService) {
    AppModule.port = this.configService.get<string>('port');
  }
}
