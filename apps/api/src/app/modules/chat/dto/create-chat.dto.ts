import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class ChatCreateDto {
  @IsString()
  @IsNotEmpty({ message: 'The chat name' })
  name: string;

  @IsArray()
  @IsNotEmpty({ message: 'The users array is requied' })
  users: string[];
}
