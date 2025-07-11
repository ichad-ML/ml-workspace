import { createHash } from 'crypto';
import { InAppOtpDtoGetDetails } from '../dtos/otp.dto';
import { getCurrentDate } from './date.utils';
import { DateFormat } from '../enums/date.enum';

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
    timeLimit,
    salt?.trim(),
  ].join(DELIMITER);

  return createHashSignature(dataToHash);
}

export async function createTokenSignature(
  apiKey: string,
  secretKey: string
): Promise<string> {
  const currentDate = getCurrentDate(DateFormat.YMD);
  const data = [apiKey, secretKey, currentDate.trim()].join('|');

  const hash = createHashSignature(data);
  console.log('hash===>', hash);
  return hash;
}

export function createHashSignature(data: string): string {
  return createHash('sha512').update(data).digest('hex');
}
