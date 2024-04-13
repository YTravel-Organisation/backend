import { RmqOptions, Transport } from '@nestjs/microservices';

export const searchMicroserviceOptions: RmqOptions = {
  transport: Transport.RMQ,
  options: {
    urls: [
      `amqp://ytravel_rabbitmq_user:ytravel_rabbitmq_password@rabbitmq:5672`,
    ],
    queue: 'search_queue',
  },
};
