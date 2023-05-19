import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MessagesDocument } from './schema/messages.schema';
import { CreateMessageDto } from './dto/create-message.dto';

@Injectable()
export class MessagesService {
  constructor(
    @InjectModel('messages')
    private readonly messageModel: Model<MessagesDocument>
  ) {}

  findMessages(chatId: string) {
    return this.messageModel.find({ chatId });
  }

  async createMessage(data: CreateMessageDto, sender: string) {
    return await this.messageModel.create({
      chatId: data.chatId,
      text: data.text,
      sender: sender,
      sentLocation: {
        lat: data.lat,
        lng: data.lng,
      },
    });
  }
}
