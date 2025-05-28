import { Body, Controller, Post } from '@nestjs/common';
import { UserRepository } from './users.repository';
import { CreateUserDto } from '../users/DTOs/create-user.dto';

@Controller('/user')
export class UserController {
  constructor(private userRepository: UserRepository) {}

  @Post()
  async createUser(@Body() userData: CreateUserDto) {
    this.userRepository.salvar(userData);
    return userData;
  }
}
