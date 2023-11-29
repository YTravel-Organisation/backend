import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PrismaModule } from './tools/prisma.module';
import RedisConfig from './tools/redis.config';
import { CacheModule, CacheModuleOptions } from '@nestjs/common/cache';

// import { CommentsModule } from './comments/comments.module';
// import { EventsModule } from './events/events.module';
// import { HotelsModule } from './hotels/hotels.module';
// import { NotificationsModule } from './notifications/notifications.module';
// import { PaymentsModule } from './payments/payments.module';
// import { ReservationsModule } from './reservations/reservations.module';
// import { RolesModule } from './roles/roles.module';
// import { RoomsModule } from './rooms/rooms.module';
import { UsersModule } from './modules/users/users.module';
import { UsersService } from './modules/users/users.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env/.env',
    }),
    PrismaModule,
    ConfigModule.forFeature(RedisConfig),
    CacheModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (
        configService: ConfigService,
      ): Promise<CacheModuleOptions> => ({
        store: 'store',
        host: configService.get<string>('redis.host'),
        port: configService.get<number>('redis.port'),
        password: configService.get<string>('redis.password'),
        db: configService.get<number>('redis.db'),
      }),
      inject: [ConfigService],
    }),
    // CommentsModule,
    // EventsModule,
    // HotelsModule,
    // NotificationsModule,
    // PaymentsModule,
    // ReservationsModule,
    // RolesModule,
    // RoomsModule,
    UsersModule,
  ],
  controllers: [],
  providers: [UsersService],
})
export class AppModule {}
