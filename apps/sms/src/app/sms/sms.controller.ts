import { Body, Controller, Post } from "@nestjs/common";
import { SmsService } from "./sms.service";
import { SmsDto } from "@ml-workspace/common";

@Controller('sms')
export class SmsController {
    constructor(private readonly smsService: SmsService) {}
    
    @Post('/')
    async sendSms(@Body() requestDto: SmsDto) {
        return this.smsService.sendSms(requestDto);
    }
}