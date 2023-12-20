import { RmqOptions, Transport } from '@nestjs/microservices';

export const smtpMicroserviceOptions: RmqOptions = {
  transport: Transport.RMQ,
  options: {
    urls: [`amqp://rabbitmq:5672`],
    queue: 'smtp_queue',
  },
};
