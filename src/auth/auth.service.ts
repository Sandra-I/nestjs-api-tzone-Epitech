import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
    constructor(private jwtService: JwtService) { }

    async login(id: string, email: string) {
        return {
            token: this.jwtService.sign({ email, id }),
        };
    }
}