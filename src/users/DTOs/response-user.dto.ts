import { Exclude } from 'class-transformer';

export class ResponseUserDto {
  id: number;
  name: string;
  email: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;

  @Exclude()
  password: string;

  constructor(partial: Partial<ResponseUserDto>) {
    Object.assign(this, partial);
  }
}
