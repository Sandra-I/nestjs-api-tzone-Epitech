import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  HttpStatus,
  UseGuards,
  Request,
  Post,
  Req,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { User } from './entities/user.entity';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @UseGuards(AuthGuard('jwt'))
  findAll(@Req() req) {
    return req.user.isAdmin ? this.userService.findAll() : null;
  }

  @Get('me')
  @UseGuards(AuthGuard('jwt'))
  async findMe(@Request() req) {
    const user = await this.userService.findOne(req.user.id, true);
    if (!user) throw new HttpException('No user found', HttpStatus.NOT_FOUND);
    // user.permissions = req.user.plan
    return user;
  }

  @Get('cancel')
  @UseGuards(AuthGuard('jwt'))
  async CancelSubscription(@Req() req) {
    return this.userService.cancelSubscription(req.user.id);
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Post('history')
  @UseGuards(AuthGuard('jwt'))
  async addHistory(@Param('history') history: User['history'][number], @Request() req) {
    return this.userService.updateHistory(history, req.user);
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'))
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
