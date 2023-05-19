import { IsNotEmpty, IsString } from 'class-validator';

export class UserLoginDto {
  @IsString()
  @IsNotEmpty({ message: 'The user email is required' })
  email: string;

  @IsString()
  @IsNotEmpty({ message: 'The user password is required' })
  password: string;
}
