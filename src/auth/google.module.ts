import { Module } from '@nestjs/common';
import { GoogleService } from './google.service';
import { GoogleController } from './google.controller';
import { GoogleStrategy } from './google.strategy';
import { UserModule } from 'src/user/user.module';
import { AuthModule } from './auth.module';

@Module({
    imports: [UserModule, AuthModule],
    controllers: [GoogleController],
    providers: [GoogleStrategy, GoogleService],
})

export class GoogleModule {}