import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import dotenv from 'dotenv';
import { UsersService } from '../users/users.service';
import { UserResponseDto } from 'src/modules/users/dto/responce-user.dto';
import { type User } from '../users/types/user';
dotenv.config();


type RequestWithUser = Request & {
    user?: User
}

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private UsersService: UsersService,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    console.log('AuthGuard');

    const request = context.switchToHttp().getRequest<RequestWithUser>();
    const accessToken = request.cookies.accessToken;
    const refreshToken = request.cookies.refreshToken;
    // console.log(token);

    // console.log(request);

    if (!accessToken || accessToken === 'null')
      throw new UnauthorizedException('No token provided (What a dog doing!)');

    try {
      const payload = this.jwtService.verify(accessToken, {
        secret: process.env.JWT_SECRET,
      });
      const user = await this.UsersService.getUserById(payload.sub);
      if (!user) throw new Error('User not found');
      request.user = new UserResponseDto(user);
      return true;
    } catch (err) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
