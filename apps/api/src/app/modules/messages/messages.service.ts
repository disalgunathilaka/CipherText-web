import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MessagesDocument } from './schema/messages.schema';
import { CreateMessageDto } from './dto/create-message.dto';
import { KeyStoreService } from '../key-store/key-store.service';
import { decryptMessage } from '../../../utils/decrypt-message';

@Injectable()
export class MessagesService {
  constructor(
    @InjectModel('messages')
    private readonly messageModel: Model<MessagesDocument>,
    private readonly keyStoreService: KeyStoreService
  ) {}

  async findMessages(chatId: string) {
    const messages = await this.messageModel.find({ chatId });
    const messagesWithKey = [];

    await Promise.all(
      messages.map(async (message) => {
        const key = await this.keyStoreService.findByUser(message.sendBy);

        const text = decryptMessage({
          text: message.text,
          publicKey: key.publicKey,
        });

        messagesWithKey.push({
          ...message.toObject(),
          text: text,
          senderKey: key.publicKey,
        });
      })
    );

    return messagesWithKey;
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
