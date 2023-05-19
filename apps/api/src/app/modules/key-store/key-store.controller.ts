import { Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { KeyStoreService } from './key-store.service';
import { AuthGuard } from '@nestjs/passport';
import { getCurrentUser } from '../auth/decorator/current-user.decorator';

@Controller('key-store')
export class KeyStoreController {
  constructor(private readonly keyStoreService: KeyStoreService) {}

  @Post('/generate-key')
  @UseGuards(AuthGuard('jwt'))
  async currentUser(@getCurrentUser() id: string) {
    return await this.keyStoreService.create({ userId: id });
  }

  @Get('/public-key/:userId')
  async getPublicKey(
    @getCurrentUser() id: string,
    @Param('userId') userId: string
  ) {
    return await this.keyStoreService.getPublicKey(userId);
  }

  @Get('/my-keys')
  @UseGuards(AuthGuard('jwt'))
  async getMykeys(@getCurrentUser() id: string) {
    return await this.keyStoreService.findByUser(id);
  }
}
