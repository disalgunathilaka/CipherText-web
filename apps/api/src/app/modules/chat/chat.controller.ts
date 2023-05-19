import { Body, Controller, Post } from '@nestjs/common';
import { ChatService } from './chat.service';
import { getCurrentUser } from '../auth/decorator/current-user.decorator';
import { ChatCreateDto } from './dto/create-chat.dto';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post('create')
  async createUser(@Body() data: ChatCreateDto, @getCurrentUser() id: string) {
    if (data.users.includes(id)) {
      data.users.push(id);
    }

    return await this.chatService.createChat(data, id);
  }
}
