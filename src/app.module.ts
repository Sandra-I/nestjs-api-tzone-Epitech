import { Module} from '@nestjs/common';
import { StripeModule } from 'nestjs-stripe';
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
import { JwtStrategy } from './auth/jwt.strategy';

const config = configuration();

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
    StripeModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '2 days' },
    }),
    StripeModule.forRoot({
      apiKey: config.stripe.apiKey,
      apiVersion: '2020-08-27',
    }),
  ],
  controllers: [AppController],
  providers: [AppService, JwtStrategy],
})
export class AppModule {
  static port: number | string;
  
  /**
   * @param configService - [readonly] Used to retrieve the port number
   */
  constructor(private readonly configService: ConfigService) {
    AppModule.port = this.configService.get<string>('port');
  }

}
