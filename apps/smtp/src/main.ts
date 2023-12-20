import { NestFactory } from '@nestjs/core';
import { SmtpModule } from './smtp.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(SmtpModule, {});
  await app.listen();
}
bootstrap();
