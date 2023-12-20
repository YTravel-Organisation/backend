import { Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { smtpMicroserviceOptions } from 'lib/queues/smtp.queue';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'SMTP_SERVICE',
        transport: Transport.RMQ,
        options: smtpMicroserviceOptions.options,
      },
    ]),
  ],
  providers: [EmailService],
  exports: [EmailService],
})
export class EmailModule {}
