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
import { MessagesService } from './messages.service';
import { AuthGuard } from '@nestjs/passport';
import { CreateMessageDto } from './dto/create-message.dto';
import { getCurrentUser } from '../auth/decorator/current-user.decorator';
import { EncryptMessageDto } from './dto/encrypt-message-dto';
import { encryptWithPrivateKey } from '../../../utils/decrypt-message';

@Controller('messages')
@UsePipes(ValidationPipe)
@UseGuards(AuthGuard('jwt'))
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Get(':chatId')
  getmessage(@Param('chatId') chatId: string) {
    return this.messagesService.findMessages(chatId);
  }

  @Post('create')
  createMessage(
    @Body() message: CreateMessageDto,
    @getCurrentUser() id: string
  ) {
    return this.messagesService.createMessage(message, id);
  }

  @Post('encrypt')
  encryptMessage(@Body() data: EncryptMessageDto) {
    return encryptWithPrivateKey(data);
  }
}
