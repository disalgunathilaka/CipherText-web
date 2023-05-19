import { Module } from '@nestjs/common';
import { KeyStoreService } from './key-store.service';
import { KeyStoreController } from './key-store.controller';
import { KeyStoreSchema } from './schema/key-store.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'key-store', schema: KeyStoreSchema }]),
  ],
  controllers: [KeyStoreController],
  providers: [KeyStoreService],
  exports: [KeyStoreService],
})
export class KeyStoreModule {}
