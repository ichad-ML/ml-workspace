import { IsEnum, IsNotEmpty, IsString, Length } from 'class-validator';
import { PickType } from '@nestjs/swagger';
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
}

export class InAppOtpDtoValidate extends PickType(InAppOtpDtoGetDetails, [
  'mobileNumber',
  'deviceId',
  'serviceType',
  'timeLimit',
]) {
  @IsString()
  @IsNotEmpty()
  pin: string;

  @IsString()
  @IsNotEmpty()
  token: string;
}
