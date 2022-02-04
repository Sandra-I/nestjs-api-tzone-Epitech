import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigurationService } from './configuration/configuration/configuration.service';

/**
 * Set the used port in the constructor
 */
@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, ConfigurationService],
})
export class AppModule {
  static port: number | string;

  /**
   * @param configurationService - [readonly] Used to retrieve the port number
   */
  constructor(private readonly configurationService: ConfigurationService) {
    AppModule.port = this.configurationService.port;
  }
}
