import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import * as dotenv from 'dotenv';

dotenv.config();

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor() {
    super({
      datasources: { db: { url: process.env.DATABASE_URL } },
    });

    this.$use(async (params, next) => {
      const result = await next(params);
      function convertBigIntToString(obj) {
        for (const key in obj) {
          if (typeof obj[key] === 'bigint') {
            obj[key] = obj[key].toString();
          } else if (obj[key] && typeof obj[key] === 'object') {
            convertBigIntToString(obj[key]);
          }
        }
      }

      if (Array.isArray(result)) {
        result.forEach(convertBigIntToString);
      } else if (result && typeof result === 'object') {
        convertBigIntToString(result);
      }

      return result;
    });
  }

  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
