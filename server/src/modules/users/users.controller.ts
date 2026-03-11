import { Controller, Get, Post, Body, Param, Patch, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { UsersService } from './users.service';
import { RegisterDto } from '../auth/dto/registr.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async createUser(@Body() createUserDto: RegisterDto) {
    const user = await this.usersService.createUser(createUserDto);
    
    const { password, ...result } = user;
    return result;
  }

  @Get()
  async getAllUsers() {
    const users = await this.usersService.getAllUsers();
    return users.map(({ password, ...user }) => user);
  }

  @Get(':id')
  async getUserById(@Param('id') id: string) {
    const { password, ...user } = await this.usersService.getUserById(id);
    return user;
  }

  @Patch(':id')
  async updateUser(@Param('id') id: string, @Body() updateData: Partial<RegisterDto>) {
    const { password, ...user } = await this.usersService.updateUser(id, updateData);
    return user;
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeUser(@Param('id') id: string) {
    await this.usersService.removeUser(id);
  }
}