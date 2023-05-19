import { Module } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { MessagesController } from './messages.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { MessagesSchema } from './schema/messages.schema';
import { KeyStoreModule } from '../key-store/key-store.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'messages', schema: MessagesSchema }]),
    KeyStoreModule,
  ],
  controllers: [MessagesController],
  providers: [MessagesService],
  exports: [MessagesService],
})
export class MessagesModule {}
