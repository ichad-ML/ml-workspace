import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  Length,
} from 'class-validator';
import { OtpServiceType } from '../enums/otp.enum';
import { PickType } from '@nestjs/swagger';

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
  @IsEnum(OtpServiceType)
  serviceType: OtpServiceType;

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
