import { Injectable } from '@nestjs/common';
import { sign } from 'jsonwebtoken';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(private userService: UsersService) {}

  async signPayload(payload: { email: string }) {
    return sign(payload, process.env.SECRET_KEY, { expiresIn: '7d' });
  }
  async validateUser(payload: { email: string }) {
    return await this.userService.findByEmail(payload.email);
  }
}
