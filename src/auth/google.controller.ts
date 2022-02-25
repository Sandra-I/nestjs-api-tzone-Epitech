import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GoogleService } from './google.service';

@Controller('google')
export class GoogleController {
    
    constructor(private readonly googleService: GoogleService) { }

    @Get()
    @UseGuards(AuthGuard('google'))
    async googleAuth(@Req() req: any) {}

    @Get('redirect')
    @UseGuards(AuthGuard('google'))
    googleAuthRedirect(@Req() req: any) {
        const user = this.googleService.googleLogin(req);
        return user || 'This user doesn\'t exists'
    }
}