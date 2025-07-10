import { authenticator } from "otplib";

export function generateSecret(): string {
    return authenticator.generateSecret();
}
    
export function  generateToken(secret: string, timelimitSeconds = 30): string {
    authenticator.options = {
        step: timelimitSeconds, // <--- Set token validity period here
    };

    return authenticator.generate(secret);
}

export function verifyToken(
    secret: string,
    token: string,
    timelimitSeconds = 30
    ): boolean {
    authenticator.options = {
        step: timelimitSeconds,
    };

    return authenticator.check(token, secret);
}