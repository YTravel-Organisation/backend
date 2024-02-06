import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PrismaModule } from './tools/prisma.module';
import RedisConfig from './tools/redis.config';
import { CacheModule, CacheModuleOptions } from '@nestjs/common/cache';

// import { CommentsModule } from './comments/comments.module';
// import { EventsModule } from './events/events.module';
// import { NotificationsModule } from './notifications/notifications.module';
// import { PaymentsModule } from './payments/payments.module';
// import { ReservationsModule } from './reservations/reservations.module';
// import { RoomsModule } from './rooms/rooms.module';
import { RolesModule } from './modules/roles/roles.module';
import { UserModule } from './modules/users/users.module';
import { EmailModule } from './modules/email/email.module';
import { PrometheusMiddleware } from './middleware/prometheus.middleware';
import { AuthModule } from './modules/auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { HotelsModule } from './modules/hotels/hotels.module';

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
    HotelsModule,
    // NotificationsModule,
    // PaymentsModule,
    // ReservationsModule,
    // RoomsModule,
    RolesModule,
    EmailModule,
    UserModule,
    AuthModule,
    JwtModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(PrometheusMiddleware).forRoutes('*');
  }
}
