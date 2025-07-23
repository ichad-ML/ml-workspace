import { OTPCollection } from "../enums/otp.enum";

export function isSmsOTP(data: string): boolean {
    return data === OTPCollection.SMS_OTP;
}