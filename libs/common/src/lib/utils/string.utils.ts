import { createHash } from 'crypto';
import { InAppOtpDtoGetDetails } from '../dtos/otp.dto';

export type Functions<T> = Partial<{
  [K in keyof T]: T[K];
}>;

export function createSignature(
  dto: InAppOtpDtoGetDetails,
  date: string,
  salt: string
): string {
  const { username, password, mobileNumber, deviceId, serviceType, timeLimit } =
    dto;
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
  return hashSha512(dataToHash);
}

function hashSha512(data: string): string {
  return createHash('sha512').update(data).digest('hex');
}
