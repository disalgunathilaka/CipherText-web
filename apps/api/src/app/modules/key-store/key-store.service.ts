import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { KeyStoreDocument } from './schema/key-store.schema';
import crypto from 'crypto';

@Injectable()
export class KeyStoreService {
  constructor(
    @InjectModel('key-store')
    private readonly keyStoreModel: Model<KeyStoreDocument>
  ) {}

  async findByUser(userId: string) {
    const data = await this.keyStoreModel.findOne({ userId, isValid: true });

    if (!data) {
      return this.create({ userId });
    }

    return data;
  }

  async create(data: { userId: string }) {
    const { privateKey, publicKey } = crypto.generateKeyPairSync('rsa', {
      modulusLength: 2048,
      publicKeyEncoding: {
        type: 'spki',
        format: 'pem',
      },
      privateKeyEncoding: {
        type: 'pkcs8',
        format: 'pem',
      },
    });

    return await this.keyStoreModel.create({
      userId: data.userId,
      privateKey,
      publicKey,
      isValid: true,
    });
  }

  async getPublicKey(userId: string) {
    return await this.keyStoreModel
      .findOne({ userId, isValid: true })
      .select('publicKey');
  }
}
