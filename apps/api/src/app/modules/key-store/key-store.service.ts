import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { KeyStoreDocument } from './schema/key-store.schema';
import crypto, { generateKeyPairSync } from 'crypto';

@Injectable()
export class KeyStoreService {
  constructor(
    @InjectModel('key-store')
    private readonly keyStoreModel: Model<KeyStoreDocument>
  ) {}

  async create() {
    const { privateKey, publicKey } = await generateKeyPairSync('rsa', {
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
      privateKey,
      publicKey,
      isValid: true,
    });
  }

  async getPublicKey(id: string) {
    return await this.keyStoreModel
      .findOne({ id, isValid: true })
      .select('publicKey');
  }
}
