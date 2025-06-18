import { Controller, Get } from "@nestjs/common";

@Controller("in-app-otp")
export class InAppOtpController {

  @Get('/')
  getData(): { message: string } {
    return { message: "In-App OTP Service is running!" };
  }
}