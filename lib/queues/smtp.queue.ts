import { RmqOptions, Transport } from '@nestjs/microservices';

export const smtpMicroserviceOptions: RmqOptions = {
  transport: Transport.RMQ,
  options: {
    urls: [
      'amqps://bzaqmyki:vEkyD8WQClTuLK5zyvrSNH6xvsOlEVJY@whale.rmq.cloudamqp.com/bzaqmyki',
    ],
    queue: 'smtp_queue',
  },
};
