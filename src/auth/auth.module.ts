import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import * as passport from 'passport';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { PlanModule } from 'src/plan/plan.module';
@Module({
    imports: [
        UserModule,
        PlanModule,
        PassportModule,
        JwtModule.register({
            secret: jwtConstants.secret,
            signOptions: { expiresIn: '2 days' },
        }),
    ],
    providers: [AuthService],
    exports: [AuthService],
})
export class AuthModule { }