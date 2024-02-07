import { Module } from '@nestjs/common';
import { AwsService } from './aws.service';
import { ConfigModule } from '@nestjs/config';
import s3Configuration from 'lib/config/s3.configuration';
import { s3ValidationSchema } from 'lib/config/s3.validation';

@Module({
  imports: [
    ConfigModule.forRoot({
        load: [s3Configuration],
        validationSchema: s3ValidationSchema
    }),
    AwsModule
  ],
  exports: [AwsService],
  controllers: [],
  providers: [AwsService],
})
export class AwsModule {}