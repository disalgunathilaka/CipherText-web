import { IsArray, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateMessageDto {
  @IsString()
  @IsNotEmpty({ message: 'message should contain text' })
  text: string;

  @IsString()
  @IsNotEmpty({ message: 'chat Id is required' })
  chatId: string;

  @IsNumber()
  lat: number;

  @IsNumber()
  lng: number;
}
