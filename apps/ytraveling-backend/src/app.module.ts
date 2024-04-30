import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from '../../../lib/prisma-shared/prisma.module';
import { CommentsModule } from './modules/comments/comments.module';
import { EventsModule } from './modules/events/events.module';
// import { NotificationsModule } from './notifications/notifications.module';
// import { ReservationsModule } from './reservations/reservations.module';
import { PaymentsModule } from './modules/payments/payments.module';
import { RoomModule } from './modules/rooms/rooms.module';
import { ProfilesModule } from './modules/profiles/profiles.module';
import { RolesModule } from './modules/roles/roles.module';
import { UserModule } from './modules/users/users.module';
import { EmailModule } from './modules/email/email.module';
import { PrometheusMiddleware } from './middleware/prometheus.middleware';
import { AuthModule } from './modules/auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { HotelsModule } from './modules/hotels/hotels.module';
import { RedisSharedModule } from 'lib/redis-shared/redis.module';
import { PropertyAmenitiesModule } from './modules/property_amenities/property_amenities.module';
import { LoyaltyProgramsModule } from './modules/loyalty_programs/loyalty_programs.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env/.env',
      isGlobal: true,
    }),
    PrismaModule,
    RedisSharedModule,
    CommentsModule,
    EventsModule,
    HotelsModule,
    // NotificationsModule,
    // ReservationsModule,
    PaymentsModule,
    RoomModule,
    RolesModule,
    EmailModule,
    UserModule,
    AuthModule,
    JwtModule,
    ProfilesModule,
    PropertyAmenitiesModule,
    LoyaltyProgramsModule,
  ],
  controllers: [],
  providers: [HttpModule],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(PrometheusMiddleware).forRoutes('*');
  }
}
