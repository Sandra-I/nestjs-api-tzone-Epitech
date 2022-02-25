import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';
import { GoogleUser } from './entities/google.entity';

@Injectable()
export class GoogleService {

    constructor(private userService: UserService, private authService: AuthService){}

    async googleLogin(req: Partial<{user: GoogleUser}>): Promise<{token: string} | null> {
        if(!req.user) {
            return null;
        }
        const user = await this.userService.findWithGoogleId(req.user.accessToken);
        if (!user) {
            await this.userService.create({...req.user});
        }
        return this.authService.login(user.id, user.email);
    }
}