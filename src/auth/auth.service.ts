import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Plan } from 'src/plan/entities/plan.entity';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
    constructor(private jwtService: JwtService) { }

    async login(id: string, email: string, plan: Plan, isAdmin: boolean) {
        return {
            token: this.jwtService.sign({ email, id, plan, isAdmin }),
        };
    }
}