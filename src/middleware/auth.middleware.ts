import { Injectable, NestMiddleware, HttpException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
const JwtStrategy = require('passport-jwt').Strategy;

@Injectable()
export class AuthMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        console.log("COUCOU");
        console.log(req.headers.authorization)
        res.send(new HttpException("Require to be auth", 401));
    }
}
