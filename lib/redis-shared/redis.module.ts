// lib/prisma-shared/src/prisma.module.ts
import { Module, Global } from '@nestjs/common';
import { AppRedisService } from './redis.service';
import { RedisModule } from 'nestjs-redis';

@Global()
@Module({
  imports: [
    RedisModule.forRootAsync({
      useFactory: () => ({
        url: process.env.REDIS_URL,
      }),
    }),
  ],
  providers: [AppRedisService],
  exports: [AppRedisService],
})
export class RedisSharedModule {}
