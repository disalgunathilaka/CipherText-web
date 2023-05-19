import {
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { KeyStoreService } from './key-store.service';
import { AuthGuard } from '@nestjs/passport';
import { getCurrentUser } from '../auth/decorator/current-user.decorator';

@Controller('key-store')
@UsePipes(ValidationPipe)
@UseGuards(AuthGuard('jwt'))
export class KeyStoreController {
  constructor(private readonly keyStoreService: KeyStoreService) {}

  @Get('/my-keys')
  @UseGuards(AuthGuard('jwt'))
  async getMykeys(@getCurrentUser() id: string) {
    return {
      keys: true,
    };
  }
}
