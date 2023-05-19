import { Module } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { MessagesController } from './messages.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { MessagesSchema } from './schema/messages.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'messages', schema: MessagesSchema }]),
  ],
  controllers: [MessagesController],
  providers: [MessagesService],
})
export class MessagesModule {}
