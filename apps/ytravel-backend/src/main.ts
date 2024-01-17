import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as dotenv from 'dotenv';
import { register } from 'prom-client';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const document = new DocumentBuilder()
    .setTitle('YTravel Backend API')
    .setDescription('YTravel Backend API')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const writerDescriptorDocument = SwaggerModule.createDocument(app, document);
  SwaggerModule.setup('api/documentation', app, writerDescriptorDocument);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      exceptionFactory: (errors) => {
        const messages = errors.map(
          (error) =>
            `${error.property} has wrong value ${error.value}, ${Object.values(
              error.constraints,
            ).join(', ')}`,
        );
        return new BadRequestException(messages);
      },
    }),
  );

  app.use('/metrics', async (req, res) => {
    res.set('Content-Type', register.contentType);
    res.end(await register.metrics());
  });

  await app.listen(3000);
}
bootstrap();
