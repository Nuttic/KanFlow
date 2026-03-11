
import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from '../../db/entities/user.entity';
import { RegisterDto } from '../auth/dto/registr.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async createUser(createUserDto: RegisterDto): Promise<User> {
    const { email, password } = createUserDto;

    const existingUser = await this.usersRepository.findOne({ 
      where: { email } 
    });
    
    if (existingUser) {
      throw new ConflictException('Пользователь с таким email уже существует');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = this.usersRepository.create({
      ...createUserDto,
      password: hashedPassword,
    });

    return this.usersRepository.save(user);
  }

  async getAllUsers(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async getUserById(id: string): Promise<User> {
    const user = await this.usersRepository.findOne({ 
      where: { id: +id } 
    });
    
    if (!user) {
      throw new NotFoundException('Пользователь не найден');
    }
    
    return user;
  }

  async getUserByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findOne({ 
      where: { email } 
    });
  }

  async updateUser(id: string, updateData: Partial<User>): Promise<User> {
    const user = await this.getUserById(id);
    
    if (updateData.password) {
      updateData.password = await bcrypt.hash(updateData.password, 10);
    }

    Object.assign(user, updateData);
    return this.usersRepository.save(user);
  }

  async removeUser(id: string): Promise<void> {
    const user = await this.getUserById(id);
    await this.usersRepository.remove(user);
  }
}