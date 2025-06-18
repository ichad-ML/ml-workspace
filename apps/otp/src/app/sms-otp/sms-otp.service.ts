import { Injectable } from "@nestjs/common";

@Injectable()
export class SmsOtpService {
    getData(): { message: string } {
        return { message: "SMS OTP Service is running!" };
    }
}