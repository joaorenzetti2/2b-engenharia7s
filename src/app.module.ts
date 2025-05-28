import { Module } from '@nestjs/common';
import { UserController } from './users/users.controller';
import { UsersModule } from './users/users.module';

@Module({
  imports: [UsersModule],
  controllers: [UserController],
  providers: [],
})
export class AppModule {}
