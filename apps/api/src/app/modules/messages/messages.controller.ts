import { Controller, Get, Param } from '@nestjs/common';
import { MessagesService } from './messages.service';

@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Get(':chatId')
  getmessage(@Param('chatId') chatId: string) {
    return this.messagesService.findMessages(chatId);
  }
}
