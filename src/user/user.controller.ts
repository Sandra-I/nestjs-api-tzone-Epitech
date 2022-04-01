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
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { PlanService } from 'src/plan/plan.service';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService, private readonly planService: PlanService) {}

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
    const planId = user.subscription.find((current) => !current.endDate)?.planId;
    const plan = planId ? await this.planService.findOne(planId) : null;
    user.permissions = {
      selection: plan?.selection || true,
      preview: plan?.preview || true,
      history: plan?.history || false,
      translation: plan?.translation || false,
      capture: plan?.capture || false,
      quickCapture: plan?.quickCapture || false,
    };
    return user;
  }

  @Get('cancel')
  @UseGuards(AuthGuard('jwt'))
  async CancelSubscription(@Req() req) {
    return this.userService.cancelSubscription(req.user.id);
  }

  @Post('history')
  @UseGuards(AuthGuard('jwt'))
  @ApiParam({
    type: `string`,
    name: 'text',
  })
  async addHistory(@Body('text') text: string, @Request() req) {
    return this.userService.updateHistory(text, req.user);
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
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
