import {
  Body,
  Controller,
  Get,
  Param,
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
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post('create')
  @UseGuards(AuthGuard('jwt'))
  async createUser(@Body() data: ChatCreateDto, @getCurrentUser() id: string) {
    return await this.chatService.createChat(data, id);
  }

  @Get('/accepted')
  @UseGuards(AuthGuard('jwt'))
  async getAcceptedChats(@getCurrentUser() id: string) {
    return await this.chatService.findUserChats(id, true);
  }

  @Get('/pending')
  @UseGuards(AuthGuard('jwt'))
  async getPendingChats(@getCurrentUser() id: string) {
    return await this.chatService.findUserChats(id, false);
  }

  @Get('location/:chatId')
  async getLastMessageLocations(@Param('chatId') chatId: string) {
    return await this.chatService.getChatLocations(chatId);
  }
}
