import { IsNotEmpty, IsString } from 'class-validator';

export class SmsDto {
  @IsString()
  @IsNotEmpty()
  type: string;

  @IsString()
  @IsNotEmpty()
  message: string;

  @IsString()
  @IsNotEmpty()
  mobileNumber: string;
}
