import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MessagesDocument } from './schema/messages.schema';
import { CreateMessageDto } from './dto/create-message.dto';
import { KeyStoreService } from '../key-store/key-store.service';

@Injectable()
export class MessagesService {
  constructor(
    @InjectModel('messages')
    private readonly messageModel: Model<MessagesDocument>,
    private readonly keyStoreService: KeyStoreService
  ) {}

  async findMessages(chatId: string) {
    return await this.messageModel.find({ chatId });
  }

  async createMessage(data: CreateMessageDto, sender: string) {
    return await this.messageModel.create({
      chatId: data.chatId,
      text: data.text,
      sendBy: sender,
      sentLocation: {
        lat: data.lat,
        lng: data.lng,
      },
    });
  }
}
