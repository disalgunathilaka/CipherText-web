import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class ChatCreateDto {
  @IsString()
  @IsNotEmpty({ message: 'message should contain text' })
  text: string;

  @IsArray()
  @IsNotEmpty({ message: 'chat Id is required' })
  chatId: string;
}
