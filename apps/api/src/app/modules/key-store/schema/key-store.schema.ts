import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type KeyStoreDocument = KeyPair & Document;

@Schema({ timestamps: true })
export class KeyPair {
  @Prop()
  privateKey: string;

  @Prop()
  publicKey: string;

  @Prop({ default: true })
  isValid: boolean;
}

export const KeyStoreSchema = SchemaFactory.createForClass(KeyPair);
