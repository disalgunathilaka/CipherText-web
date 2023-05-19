import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ChatSchema } from './schema/chat.schema';
import { KeyStoreModule } from '../key-store/key-store.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'chat', schema: ChatSchema }]),
    KeyStoreModule,
  ],
  controllers: [ChatController],
  providers: [ChatService],
})
export class ChatModule {}
