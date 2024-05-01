import { Injectable } from '@nestjs/common';
import { RedisService as NestRedisService } from 'nestjs-redis';
import { Redis } from 'ioredis';

@Injectable()
export class AppRedisService {
  private client: Redis;

  constructor(private redisService: NestRedisService) {
    this.client = this.redisService.getClient();
  }

  async get(key: string): Promise<string | null> {
    return await this.client.get(key);
  }

  async set(key: string, value: string, ttl: number = null): Promise<void> {
    if (ttl) {
      await this.client.set(key, value, 'EX', ttl);
    } else {
      await this.client.set(key, value);
    }
  }
}
