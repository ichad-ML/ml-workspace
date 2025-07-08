import { IsEnum, IsNotEmpty, IsString, Length } from 'class-validator';
import { TransactionType } from '../enums/otp.enum';
import { Expose } from 'class-transformer';
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

  @IsString()
  @IsNotEmpty()
  @Expose({ name: 'timelimit' })
  timeLimit: string;

  @IsNotEmpty()
  @IsEnum(TransactionType)
  serviceType: TransactionType;
}

export class InAppOtpResponseDto {
  @IsString()
  @IsNotEmpty()
  code: string;

  @IsString()
  @IsNotEmpty()
  message: string;

  @IsString()
  @IsNotEmpty()
  otp: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  token: string;
}

export class InAppOtpDtoValidate extends PickType(InAppOtpDtoGetDetails, [
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
  pin: string;

  @IsNotEmpty()
  @Expose({ name: 'service_type' })
  @IsEnum(TransactionType)
  serviceType: TransactionType;

  @IsString()
  @IsNotEmpty()
  token: string;
}


