// import { JwtService } from '@nestjs/jwt';
// import { Injectable, NotFoundException } from '@nestjs/common';
// import { env } from 'process';
// import dotenv from 'dotenv';
// import * as bcrypt from 'bcrypt';
// import { type User } from '../users/types/user';
// import { UsersService } from '../users/users.service';
// import { Response } from 'express';
// import { LoginParams, RegisterParams } from './types/auth-types';


// type Tokens = {
//   accessToken: string;
//   refreshToken: string;
// };

// type RegisterLoginResponse = {
//   tokens: Tokens;
//   user: User;
// };

// // ?
// type setTokenParams = {
//   res: Response;
//   accessToken: string;
//   refreshToken: string;
// };

// dotenv.config();

// @Injectable()
// export class AuthService {
//   constructor(
//     private usersService: UsersService,
//     private jwtService: JwtService,
//   ) {}

//   async register({
//     email,
//     username,
//     password,
//   }: RegisterParams): Promise<RegisterLoginResponse> {
//     const user = await this.usersService.createUser({email, username, password});
//     if (!user) throw new Error('User not created');
//     const tokens = await this.genereateTokens(
//       user.id.toString(),
//     );
//     return { tokens, user };
//   }
//   async login({
//     email,
//     password,
//   }: LoginParams): Promise<RegisterLoginResponse> {
//     const user = await this.usersService.getUserByEmail(email)

//     if(user && await bcrypt.compare(user.password, password)){
//        throw new NotFoundException('Wrong password or email');
//     }
//       const tokens = await this.genereateTokens(user.id.toString());

//     return { tokens, user };
//   }


//   removeAuthCookies(res: Response) {
//     res.clearCookie('accessToken');
//     res.clearCookie('refreshToken');
//   }

//   setTokensCookies(res: Response, tokens: Tokens) {
//     this.setAccessTokenCookie(res, tokens.accessToken);
//     this.setRefreshTokenCookie(res, tokens.refreshToken);
//   }

//   setAccessTokenCookie(res: Response, accessToken: string) {
//     res.cookie('accessToken', accessToken, {
//       httpOnly: true,
//       maxAge: 1000 * 60 * 30,
//     });
//   }

//   setRefreshTokenCookie(res: Response, refreshToken: string) {
//     res.cookie('refreshToken', refreshToken, {
//       httpOnly: true,
//       maxAge: 1000 * 60 * 60 * 24 * 30,
//     });
//   }

//   async generateAccessToken(userId: string) {
//     const accessToken = this.jwtService.sign(
//       { sub: userId },
//       {
//         secret: process.env.JWT_SECRET,
//         expiresIn: 1800,
//       },
//     );
//     return accessToken;
//   }

//   async generateRefreshToken(userId: string) {
//     const refreshToken = this.jwtService.sign(
//       { sub: userId },
//       {
//         secret: process.env.JWT_SECRET,
//         expiresIn: 180000,
//       },
//     );
//     return refreshToken;
//   }

//   async genereateTokens(userId: string) {
//     const accessToken = await this.generateAccessToken(userId);
//     const refreshToken = await this.generateRefreshToken(userId);
//     return { accessToken, refreshToken };
//   }

//   async refreshAccessToken(refreshToken: string) {
//     const payload = this.jwtService.verify(refreshToken, {
//       secret: 'secret',
//     });

//     const user = await this.usersService.getUserById(payload.userId);
//     if (!user) throw new Error('User not found');
//     const token = await this.generateAccessToken(user.id.toString());

//     return token;
//   }
//   async verifyToken(token: string) {
//     return this.jwtService.verify(token, { secret: env.JWT_SECRET });
//   }

//   async verifyAccessToken(token: string) {
//     return this.jwtService.verify(token, { secret: 'secret' });
//   }
//   setAuthCookies(
//     res: Response,
//     tokens: { accessToken: string; refreshToken: string },
//   ) {
//     res.cookie('accessToken', tokens.accessToken, {
//       httpOnly: true,
//       maxAge: 1000 * 60 * 30,
//     });
//     res.cookie('refreshToken', tokens.refreshToken, {
//       httpOnly: true,
//       maxAge: 1000 * 60 * 60 * 24 * 30,
//     });
//   }
// }