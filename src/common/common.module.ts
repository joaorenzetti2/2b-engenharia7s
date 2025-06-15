import { Module } from '@nestjs/common';
import { HashService } from './services/hash.service';

@Module({
  providers: [HashService],
  exports: [HashService], // Exporta o serviço para que possa ser utilizado em outros módulos
})
export class CommonModule {}
