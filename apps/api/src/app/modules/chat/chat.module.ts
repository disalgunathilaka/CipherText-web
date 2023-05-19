import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ChatSchema } from './schema/chat.schema';
import { KeyStoreModule } from '../key-store/key-store.module';
import { MessagesModule } from '../messages/messages.module';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'chat', schema: ChatSchema }]),
    KeyStoreModule,
    MessagesModule,
    UsersModule,
  ],
  controllers: [ChatController],
  providers: [ChatService],
})
export class ChatModule {}
