import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Remove propriedades não definidas no DTO
      forbidNonWhitelisted: true, // Rejeita requisições com propriedades não definidas no DTO
      transform: true, // Transforma automaticamente os dados recebidos em instâncias dos DTOs
    }),
  );

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
