import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ChatService } from './chat.service';
import { getCurrentUser } from '../auth/decorator/current-user.decorator';
import { ChatCreateDto } from './dto/create-chat.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('chat')
@UsePipes(ValidationPipe)
@UseGuards(AuthGuard('jwt'))
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post('create')
  async createUser(@Body() data: ChatCreateDto, @getCurrentUser() id: string) {
    return await this.chatService.createChat(data, id);
  }

  @Get('/accepted')
  async getAcceptedChats(@getCurrentUser() id: string) {
    return await this.chatService.findUserChats(id, true);
  }

  @Get('/pending')
  async getPendingChats(@getCurrentUser() id: string) {
    return await this.chatService.findUserChats(id, false);
  }
}
