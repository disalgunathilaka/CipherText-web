import { IsNotEmpty, IsString } from 'class-validator';

export class EncryptMessageDto {
  @IsString()
  @IsNotEmpty({ message: 'message should contain text' })
  text: string;

  @IsString()
  @IsNotEmpty({ message: 'private key' })
  privateKey: string;
}
