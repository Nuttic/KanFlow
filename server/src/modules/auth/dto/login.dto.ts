import { IsNotEmpty, IsString, MinLength, isEmail } from 'class-validator';

export class LoginDto {

  @IsString()
  @IsNotEmpty()
  // @isEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}