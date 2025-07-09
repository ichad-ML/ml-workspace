import { Injectable } from "@nestjs/common";
import { authenticator } from 'otplib';

@Injectable()
export class OtpService {
      generateSecret(): string {
        return authenticator.generateSecret();
      }
    
      generateToken(secret: string, timelimitSeconds = 30): string {
        authenticator.options = {
          step: timelimitSeconds, // <--- Set token validity period here
        };
    
        return authenticator.generate(secret);
      }
    
      verifyToken(secret: string, token: string, timelimitSeconds = 30): boolean {
        authenticator.options = {
          step: timelimitSeconds,
        };
    
        return authenticator.check(token, secret);
      }
}