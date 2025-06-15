/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { UpdateUserDto } from '../DTOs';
import { CreateUserDto } from '../DTOs/create-user.dto';
import { ResponseUserDto } from '../DTOs';
import { InjectRepository } from '@nestjs/typeorm';
import { HashService } from 'src/common/services/hash.service'; // Serviço para manipulação de hashes, como senhas

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) // injeta o repositório typeorm para a entidade User
    private usersRepository: Repository<User>, // interface do typeorm que fornece métodos para interagir com o banco de dados
    private hashService: HashService, // serviço para manipulação de hashes, como senhas
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<ResponseUserDto> {
    const hashedPassword = await this.hashService.hash(createUserDto.password);
    const user = this.usersRepository.create({
      ...createUserDto,
      password: hashedPassword, // armazena a senha criptografada
    });
    await this.usersRepository.save(user);
    return new ResponseUserDto(user);
  }

  async findAll(): Promise<ResponseUserDto[]> {
    const users = await this.usersRepository.find();
    return users.map((user) => new ResponseUserDto(user));
  }

  async findOne(id: number): Promise<ResponseUserDto> {
    const user = await this.usersRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException(`Usuário com ID ${id} não encontrado`);
    }
    return new ResponseUserDto(user);
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.usersRepository.findOneBy({ email });
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

    if (updateUserDto.password) {
      updateUserDto.password = await this.hashService.hash(
        updateUserDto.password,
      );
    }

    const updatedUser = this.usersRepository.merge(user, updateUserDto);
    await this.usersRepository.save(updatedUser);
    return new ResponseUserDto(updatedUser);
  }

  async remove(id: number): Promise<void> {
    const user = await this.findOne(id);
    await this.usersRepository.remove(user);
  }

  async validateUser(email: string, password: string): Promise<User | null> {
    try {
      const user = await this.findByEmail(email);
      const isPasswordValid = await this.hashService.compare(
        password,
        user.password,
      );
      if (isPasswordValid) {
        return user; // retorna o usuário se a senha for válida
      }
      return null;
    } catch (error) {
      return null; // retorna null se o usuário não for encontrado
    }
  }
}
