import { User } from '../types/user';

export class UserResponseDto {
  id: string;
  name: string;
  email: string;

  constructor(user: User) {
    this.id = String(user.id);
    this.name = user.name;
    this.email = user.email;
  }
}