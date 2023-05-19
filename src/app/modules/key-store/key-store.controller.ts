import { Controller } from '@nestjs/common';
import { KeyStoreService } from './key-store.service';

@Controller('key-store')
export class KeyStoreController {
  constructor(private readonly keyStoreService: KeyStoreService) {}
}
