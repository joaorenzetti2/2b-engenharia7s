import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class HashService {
  private readonly saltRounds = 10;

  async hash(plaintext: string): Promise<string> {
    // gera o hash a partir de um texto puro (senha)
    return await bcrypt.hash(plaintext, this.saltRounds);
  }

  async compare(plaintext: string, hash: string): Promise<boolean> {
    // compara o texto puro (senha) com o hash gerado
    return await bcrypt.compare(plaintext, hash);
  }
}
