import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  Length,
} from 'class-validator';
import { PickType } from '@nestjs/swagger';
import { OTPService } from '../enums/otp.enum';

export class InAppOtpDtoGetDetails {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  @Length(11, 11, {
    message: 'mobileNumber must be 11 digits',
  })
  mobileNumber: string;

  @IsString()
  @IsNotEmpty()
  deviceId: string;

  @IsString()
  @IsNotEmpty()
  date: string;

  @IsNotEmpty()
  @IsEnum(OTPService)
  serviceType: OTPService;

  @IsString()
  @IsNotEmpty()
  signature: string;
}

export class InAppOtpDtoValidate extends PickType(InAppOtpDtoGetDetails, [
  'mobileNumber',
  'deviceId',
  'serviceType',
]) {
  @IsString()
  @IsNotEmpty()
  pin: string;

  @IsNotEmpty()
  @IsNumber()
  timeLimit: number;

  @IsString()
  @IsNotEmpty()
  token: string;
}
