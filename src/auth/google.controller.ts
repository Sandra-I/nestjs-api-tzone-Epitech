import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiExcludeEndpoint } from '@nestjs/swagger';
import { GoogleService } from './google.service';

@Controller('google')
export class GoogleController {

    constructor(private readonly googleService: GoogleService) { }

    @Get()
    @UseGuards(AuthGuard('google'))
    @ApiExcludeEndpoint()
    async googleAuth(@Req() req: any) {}

    @Get('redirect')
    @UseGuards(AuthGuard('google'))
    @ApiExcludeEndpoint()
    async googleAuthRedirect(@Req() req: any) {
        const user = await this.googleService.googleLogin(req);
        return `<script>window.opener.postMessage(${JSON.stringify(user)}, "*"); window.close();</script>`;
    }
}