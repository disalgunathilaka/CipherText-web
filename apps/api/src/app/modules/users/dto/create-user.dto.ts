import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty({ message: 'The user email is required' })
  email: string;

  @IsString()
  @IsNotEmpty({ message: 'The user password is required' })
  password: string;

  @IsString()
  @IsNotEmpty({ message: 'The user firstName is required' })
  firstName: string;

  @IsString()
  @IsNotEmpty({ message: 'The user lastName is required' })
  lastName: string;
}
