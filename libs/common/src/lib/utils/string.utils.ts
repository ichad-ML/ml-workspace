import { createHash } from 'crypto';
import { InAppOtpDtoGetDetails } from '../dtos/otp.dto';

export function createInAppSignature(
  dto: InAppOtpDtoGetDetails,
  salt: string
): string {
  const {
    username,
    password,
    mobileNumber,
    deviceId,
    date,
    serviceType,
    timeLimit,
  } = dto;

  const DELIMITER = '|';
  const dataToHash = [
    username?.trim(),
    password?.trim(),
    mobileNumber?.trim(),
    deviceId?.trim(),
    date?.trim(),
    serviceType?.trim(),
    timeLimit?.trim(),
    salt?.trim(),
  ].join(DELIMITER);

  const res = createHashSignature(dataToHash);
  console.log('res==>', res);
  return res;
}

export function createHashSignature(data: string): string {
  return createHash('sha512').update(data).digest('hex');
}
