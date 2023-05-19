import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UsePipes,
  ValidationPipe,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
@UsePipes(ValidationPipe)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @UseGuards(AuthGuard('jwt'))
  findAll() {
    return this.usersService.findAll();
  }

  @Post('create')
  async createUser(@Body() userData: CreateUserDto) {
    return await this.usersService.create(userData);
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  findOne(@Param('id') id: string) {
    return this.usersService.findOneById(id);
  }

  @Post('email/search')
  async findOneByEmail(@Body() body: { email: string }) {
    return await this.usersService.findOneByEmail(body.email);
  }
}
