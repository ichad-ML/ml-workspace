import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';
import { TransactionType } from '../enums/otp.enum';
import { Expose, Transform } from 'class-transformer';
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
  @Expose({ name: 'mobileno' })
  mobileNumber: string;

  @IsNotEmpty()
  @IsString()
  date: string;

  @IsNotEmpty()
  @IsString()
  @Expose({ name: 'Signature' })
  signature: string;

  @IsString()
  @IsNotEmpty()
  @Expose({ name: 'deviceID' })
  deviceId: string;

  @IsNumber()
  @IsNotEmpty()
  @Expose({ name: 'timelimit' })
  @Transform(({ value }) => Number(value))
  timeLimit: number;

  @IsNotEmpty()
  @IsEnum(TransactionType)
  serviceType: TransactionType;
}

export class InAppOtpResponseDto {
  @IsNumber()
  @IsNotEmpty()
  code: number;

  // @IsString()
  // @IsNotEmpty()
  // message: string;

  @IsString()
  @IsNotEmpty()
  otp: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  // @IsString()
  // @IsNotEmpty()
  // token: string;

  @IsString()
  @IsOptional()
  id?: string;

  @IsString()
  @IsNotEmpty()
  message: string;
}

export class InAppOtpValidateDto extends PickType(InAppOtpDtoGetDetails, [
  'deviceId',
  'timeLimit',
]) {
  @IsString()
  @IsNotEmpty()
  @Length(11, 11, {
    message: 'mobileNumber must be 11 digits',
  })
  @Expose({ name: 'mobile_no' })
  mobileNumber: string;

  @IsString()
  @IsNotEmpty()
  @Expose({ name: 'pin' })
  otp: string;

  @IsNotEmpty()
  @Expose({ name: 'service_type' })
  @IsEnum(TransactionType)
  serviceType: TransactionType;

  @IsString()
  @IsNotEmpty()
  token: string;

  @IsString()
  @IsNotEmpty()
  id: string;
}

export class SmsOtpRequestDto {
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
  @Expose({ name: 'mobileno' })
  mobileNumber: string;

  @IsString()
  @IsNotEmpty()
  @Expose({ name: 'msg' })
  message: string;

  @IsString()
  @IsNotEmpty()
  sender: string;

  @IsString()
  @IsNotEmpty()
  @Expose({ name: 'sms_provider' })
  smsProvider: string;

  @IsString()
  @IsNotEmpty()
  @Expose({ name: 'service_type' })
  serviceType: TransactionType;
}
