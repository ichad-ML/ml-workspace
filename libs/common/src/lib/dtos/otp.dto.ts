import { IsEnum, IsNotEmpty, IsString, Length } from 'class-validator';
import { TransactionType } from '../enums/otp.enum';
import { Expose } from 'class-transformer';

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

  @IsString()
  @IsNotEmpty()
  @Expose({ name: 'deviceID' })
  deviceId: string;

  @IsNotEmpty()
  @IsEnum(TransactionType)
  serviceType: TransactionType;

  @IsNotEmpty()
  @IsString()
  @Expose({ name: 'timelimit' })
  timeLimit: string;

  @IsNotEmpty()
  @IsString()
  date: string;

  @IsNotEmpty()
  @IsString()
  @Expose({ name: 'Signature' })
  signature: string;
}

export class InAppOtpDtoValidate {
  @IsString()
  @IsNotEmpty()
  @Length(11, 11, {
    message: 'mobileNumber must be 11 digits',
  })
  @Expose({ name: 'mobile_no' })
  mobileNumber: string;

  @IsString()
  @IsNotEmpty()
  @Expose({ name: 'deviceID' })
  deviceId: string;

  @IsString()
  @IsNotEmpty()
  pin: string;

  @IsString()
  @IsNotEmpty()
  @Expose({ name: 'service_type' })
  serviceType: string;

  @IsString()
  @IsNotEmpty()
  @Expose({ name: 'timelimit' })
  timeLimit: string;

  @IsString()
  @IsNotEmpty()
  token: string;
}
