import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiExcludeEndpoint, ApiOAuth2, ApiTags } from '@nestjs/swagger';
import { GoogleService } from './google.service';

@ApiTags('Auth')
@Controller('auth')
export class GoogleController {

    constructor(private readonly googleService: GoogleService) { }

    @Get()
    @UseGuards(AuthGuard('google'))
    @ApiExcludeEndpoint()
    async googleAuth(@Req() req: any) {}

    @Get('redirect')
    @UseGuards(AuthGuard('google'))
    @ApiExcludeEndpoint()
    googleAuthRedirect(@Req() req: any) {
        const user = this.googleService.googleLogin(req);
        return user || 'This user doesn\'t exists'
    }
}