import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { configuration } from '../configuration';

/**
 * Set the used port in the constructor
 */
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `${process.cwd()}/configuration/env/${process.env.NODE_ENV.trim()}.env`,
      load: [configuration]
    }),
      MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('mongodbUri')
      }),
      inject: [ConfigService],
    })
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
