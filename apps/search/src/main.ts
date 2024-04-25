import { NestFactory } from '@nestjs/core';
import { SearchModule } from './search.module';
import { searchMicroserviceOptions } from 'lib/queues/search.queue';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(
    SearchModule,
    searchMicroserviceOptions,
  );
  await app.listen();
}
bootstrap();
