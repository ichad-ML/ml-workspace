import { Body, Controller, NotFoundException, Post } from "@nestjs/common";
import { OtpService } from "./otp.service";

@Controller('otp')
export class OtpController {
  constructor(private readonly otpService: OtpService) {}

  @Post('/request-otp')
  async sendOtp(@Body() dto: { userId: string; timelimit: number }) {

      const secret = this.otpService.generateSecret();
      console.log("secret==>", secret);
      
    // secret and dto will be saved to firebase
    // Generate a time-based OTP with specified timelimit
    const token = this.otpService.generateToken(secret, dto.timelimit);

    // ✅ Just return the OTP directly in the response
    return {
      otp: token,
      expiresIn: dto.timelimit,
    };
  }

  @Post('verify')
  verifyOtp(@Body() dto: { userId: string; otp: string; timelimit: number }) {
    const secret = 'DMSF4SJRDVLXSXYU';
    const isValid = this.otpService.verifyToken(secret, dto.otp, dto.timelimit);
    return { valid: isValid };
  }
}