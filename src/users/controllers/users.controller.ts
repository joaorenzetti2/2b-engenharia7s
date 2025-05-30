import {
  Body,
  Controller,
  HttpCode,
  Post,
  HttpStatus,
  Get,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { CreateUserDto, ResponseUserDto, UpdateUserDto } from '../DTOs';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createUser(
    @Body() createUserDto: CreateUserDto,
  ): Promise<ResponseUserDto> {
    return await this.usersService.createUser(createUserDto);
  }

  @Get()
  async findAll(): Promise<ResponseUserDto[]> {
    return await this.usersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<ResponseUserDto> {
    return await this.usersService.findOne(+id); // Operador '+' tem função de converter um string em numero
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUserdto: UpdateUserDto,
  ): Promise<ResponseUserDto> {
    return await this.usersService.update(+id, updateUserdto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string): Promise<void> {
    return await this.usersService.remove(+id);
  }
}
