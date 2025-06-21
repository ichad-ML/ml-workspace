import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';
import { getCurrentFormattedDate } from '@ml-workspace/common';
import { JwtPayload } from '../interfaces/jwt-payload.interface';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly configService: ConfigService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.split(' ')[1];
    console.log('Token:', token);
    console.log('Request Headers:', request.headers);

    if (!token) {
      throw new UnauthorizedException('Token missing');
    }

    const secretKey = this.configService.get<string>('SECRET_KEY');
    const apiKey = this.configService.get<string>('API_KEY');

    if (!secretKey || !apiKey) {
      throw new UnauthorizedException('JWT secret is not defined');
    }

    try {
      const decoded = jwt.verify(token, secretKey) as JwtPayload;

      if (!decoded.apiKey || !decoded.date) {
        return false;
      }

      if (decoded.apiKey !== apiKey) {
        return false;
      }

      if (decoded.date !== getCurrentFormattedDate()) {
        return false;
      }

      request.user = decoded;
      return true;
    } catch (err) {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}
