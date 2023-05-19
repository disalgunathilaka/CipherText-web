import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ChatDocument } from './schema/chat.schema';
import { KeyStoreService } from '../key-store/key-store.service';

@Injectable()
export class ChatService {
  constructor(
    @InjectModel('chat') private readonly chatModel: Model<ChatDocument>,
    private readonly keyStoreService: KeyStoreService
  ) {}

  async createChat(data: { users: string[]; name: string }, createdBy: string) {
    const userIds = [];

    if (!data.users.includes(createdBy)) {
      userIds.push(createdBy);
    }

    const keys = await this.keyStoreService.create();

    userIds.push(...data.users);

    const users = userIds.map((user) => {
      return {
        userId: user,
        lastAccessTime: new Date().toISOString(),
        isJoined: user === createdBy,
      };
    });

    return this.chatModel.create({
      name: data.name,
      users,
      keyPair: keys._id,
    });
  }

  async findUserChats(userId: string, isAccepted: boolean) {
    return await this.chatModel
      .find({
        'users.userId': userId,
        'users.isJoined': isAccepted,
      })
      .populate({
        path: 'users.userId',
        model: 'user',
        select: 'email',
      })
      .populate({
        path: 'keyPair',
        model: 'key-store',
      });
  }
}
