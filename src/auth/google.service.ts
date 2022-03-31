import { Injectable } from '@nestjs/common';
import { UserService } from './../user/user.service';
import { PlanService } from './../plan/plan.service';
import { AuthService } from './auth.service';
import { GoogleUser } from './entities/google.entity';

@Injectable()
export class GoogleService {

    constructor(
        private authService: AuthService,
        private userService: UserService,
        private planService: PlanService) { }

    async googleLogin(req: Partial<{user: GoogleUser}>): Promise<{token: string} | null> {
        if(!req.user) {
            return null;
        }
        let user = await this.userService.findWithEmail(req.user.email);
        if (!user) {
            user = await this.userService.create({...req.user});
        }
        const userCurrentSubscription = user.subscription[user.subscription.length - 1];
        const plan = userCurrentSubscription ? await this.planService.findOne(userCurrentSubscription.planId) : null;
        return this.authService.login(user.id, user.email, plan, user.isAdmin);
    }
}