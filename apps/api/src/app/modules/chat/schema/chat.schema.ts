import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ChatDocument = Chat & Document;

export class ChatUsers {
  @Prop()
  userId: string;

  @Prop()
  lastAccessTime: string;

  @Prop()
  isJoined: boolean;
}

@Schema({ timestamps: true })
export class Chat {
  @Prop()
  users: ChatUsers[];

  @Prop()
  name: string;
}

export const ChatSchema = SchemaFactory.createForClass(Chat);
