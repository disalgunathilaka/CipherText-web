import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { ChatDocument } from './schema/chat.schema';
import { KeyStoreService } from '../key-store/key-store.service';
import { MessagesService } from '../messages/messages.service';
import { UsersService } from '../users/users.service';

@Injectable()
export class ChatService {
  constructor(
    @InjectModel('chat') private readonly chatModel: Model<ChatDocument>,
    private readonly keyStoreService: KeyStoreService,
    private readonly messageService: MessagesService,
    private readonly userService: UsersService
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
        userId: new mongoose.Types.ObjectId(user),
        lastAccessTime: new Date().toISOString(),
        isJoined: true,
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

  async updateChatScreenShots(id: string, val: boolean) {
    console.log(id, val);
    return await this.chatModel.findByIdAndUpdate(id, {
      $set: {
        dissabledScreenShots: val,
      },
    });
  }

  async getChatLocations(chatId: string) {
    const chat = await this.chatModel.findById(chatId).exec();
    if (!chat) {
      throw new NotFoundException('Chat not found');
    }

    const locations = [];

    for (const user of chat.users) {
      const lastMessage = await this.messageService.getlastMessage(
        chatId,
        user.userId
      );

      const userDetails = await this.userService.findOneById(user.userId);

      if (lastMessage && lastMessage.sentLocation) {
        locations.push({
          userId: user.userId,
          user: userDetails,
          lastAccessTime: user.lastAccessTime,
          lastMessageLocation: lastMessage.sentLocation,
        });
      } else {
        locations.push({
          userId: user.userId,
          user: userDetails,
          lastAccessTime: user.lastAccessTime,
          lastMessageLocation: { lat: 0, lng: 0 },
        });
      }
    }

    return locations;
  }
}
