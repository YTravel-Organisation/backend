import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class SearchTransportService {
  private prisma: PrismaClient = new PrismaClient();

  async searchTransport(data: any) {
    console.log('Searching flights with', data);
    return { message: 'Résultats de recherche de vol', data };
  }
}
