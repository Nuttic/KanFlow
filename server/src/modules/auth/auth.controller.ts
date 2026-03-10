// import {
//   Body,
//   Controller,
//   Get,
//   HttpCode,
//   HttpStatus,
//   NotFoundException,
//   Post,
//   Req,
//   Res,
//   UseGuards,
// } from '@nestjs/common';
// import { AuthService } from './auth.service';
// import type { Response, Request } from 'express';
// import { CurrentUser } from './decorators/current-user.decorator';
// import type { User } from 'src/modules/users/types/user';
// import { AuthGuard } from './auth.guard';
// import { RegisterDto } from './dto/registr.dto';
// import { UserResponseDto } from 'src/modules/users/dto/responce-user.dto';
// import { LoginDto } from './dto/login.dto';

// @Controller('auth')
// export class AuthController {
//   constructor(private authService: AuthService) {}

//   @Post('me')
//   @UseGuards(AuthGuard)
//   @HttpCode(HttpStatus.OK)
//   async getMe(@CurrentUser() user: User) {
//     console.log('ну тип все ок /me пашет, хозяин ');

//     return new UserResponseDto(user);
//   }

//   @Post('register')
//   @HttpCode(HttpStatus.CREATED)
//   async register(
//     @Body() dto: RegisterDto,
//     @Res() res: Response,
//     @Req() req: Request,
//   ) {
    
//     try {
      
//       const ip = (req.headers['x-forwarded-for'] ||
//         req.socket.remoteAddress) as string;

//       // Можно парсить устройство через ua-parser-js
      

//       const registerData = await this.authService.register({
//         ...dto });
//       this.authService.setTokensCookies(res, registerData.tokens);
//       // console.log('got tokens', registerData.tokens);
//       const safeUser = new UserResponseDto(registerData.user);
//       return res.status(HttpStatus.CREATED).json(safeUser);
//     } catch (error) {
//       console.log(error);
//       return new NotFoundException('User was not created');
//     }
//   }

//   @Post('login')
//   @HttpCode(HttpStatus.OK)
//   async login(
//     @Body() body: LoginDto,
//     @Res() res: Response,
//     @Req() req: Request,
//   ) {
//     const { email, password } = body;
//     console.log(req);

//     // console.log(username, email, password);
//     if (!email && !password)
//       return res.status(400).json({ error: 'Username and password required' });
//     try {
//       const registerData = await this.authService.login({
//         email,
//         password,
//       });

//       this.authService.setTokensCookies(res, registerData.tokens);
//       return res
//         .status(HttpStatus.OK)
//         .json(new UserResponseDto(registerData.user));
//     } catch (error) {
//       return new NotFoundException('User not found');
//     }
//   }

//   @Post('logout')
//   @UseGuards(AuthGuard)
//   @HttpCode(HttpStatus.OK)
//   async logout(@Req() req: Request, @Res() res: Response) {
//     this.authService.removeAuthCookies(res);
//     console.log('Хозяин, они уходят');

//     return res.sendStatus(200);
//   }

//   @Post('refresh')
//   @HttpCode(HttpStatus.OK)
//   async refresh(@Req() req: Request, @Res() res: Response) {
//     const refreshToken = req.cookies.refreshToken;
//     // console.log(req);
//     console.log('кто-то рефрешит');

//     if (!refreshToken) return res.sendStatus(401);

//     try {
//       const newAccessToken =
//         await this.authService.refreshAccessToken(refreshToken);

//       this.authService.setAccessTokenCookie(res, newAccessToken);
//       return res.sendStatus(200);
//     } catch (error) {
//       console.log(error);
//       return new NotFoundException('User not found');
//     }
//   }
// }