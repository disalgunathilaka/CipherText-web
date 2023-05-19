import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type MessagesDocument = Message & Document;

class MessageAttachment {
  @Prop()
  url: string;

  @Prop()
  isViewed: boolean;

  @Prop({ default: false })
  isOneTime: boolean;
}

@Schema({ timestamps: true })
export class Message {
  @Prop()
  text: string;

  @Prop()
  chatId: string;

  @Prop()
  sendBy: string;

  @Prop()
  attachment: MessageAttachment;

  @Prop()
  sentLocation: {
    lat: number;
    lng: number;
  };
}

export const MessagesSchema = SchemaFactory.createForClass(Message);
