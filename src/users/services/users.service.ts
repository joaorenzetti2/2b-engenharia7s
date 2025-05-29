import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from 'typeorm';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { UpdateUserDto } from '../DTOs';
import { CreateUserDto } from '../DTOs/create-user.dto';
import { ResponseUserDto } from '../DTOs';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) // Injeta o repositório TypeORM para a entidade User
    private usersRepository: Repository<User>, // Interface do TypeORM que fornece métodos para interagir com o banco de dados
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<ResponseUserDto> {
    const user = this.usersRepository.create(createUserDto);
    await this.usersRepository.save(user);
    return new ResponseUserDto(user);
  }

  async findAll(): Promise<ResponseUserDto[]> {
    const users = await this.usersRepository.find();
    return users.map((user) => new ResponseUserDto(user));
  }

  async findOne(id: number): Promise<ResponseUserDto> {
    const user = await this.usersRepository.findOneBy({ where: { id } });
    if (!user) {
      throw new NotFoundException(`Usuário com ID ${id} não encontrado`);
    }
    return new ResponseUserDto(user);
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.usersRepository.findOneBy({ where: { email } });
    if (!user) {
      throw new NotFoundException(`Usuário com email ${email} não encontrado`);
    }
    return user;
  }

  async update(
    id: number,
    updateUserDto: UpdateUserDto,
  ): Promise<ResponseUserDto> {
    const user = await this.findOne(id);
    const updatedUser = this.usersRepository.merge(user, updateUserDto);
    await this.usersRepository.save(updatedUser);
    return new ResponseUserDto(updatedUser);
  }

  async remove(id: number): Promise<void> {
    const user = await this.findOne(id);
    await this.usersRepository.remove(user);
  }
}
