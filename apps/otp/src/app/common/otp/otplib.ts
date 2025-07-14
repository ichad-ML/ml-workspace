import { VerifyOTPResponse } from '@ml-workspace/common';
import { authenticator } from 'otplib';

export function generateSecret(): string {
  return authenticator.generateSecret();
}

export function generateOTP(secret: string, timelimitSeconds = 30): string {
  authenticator.options = {
    step: timelimitSeconds, // validity period
  };

  return authenticator.generate(secret);
}

export function verifyOTP(
  secret: string,
  token: string,
  timelimitSeconds = 30
): VerifyOTPResponse {
  authenticator.options = {
    step: timelimitSeconds,
    window: 2,
  };

  const delta = authenticator.checkDelta(token, secret);

  if (delta === null) {
    return {
      isValid: false,
      isExpired: false,
      message: 'Invalid OTP.',
    };
  }

  if (delta < 0) {
    return {
      isValid: false,
      isExpired: true,
      message: `OTP expired.`,
    };
  }

  if (delta >= 0) {
    return {
      isValid: true,
      isExpired: false,
      message: 'OTP is valid.',
    };
  }

  return {
    isValid: false,
    isExpired: false,
    message: 'Unable to verify OTP.',
  };
}
