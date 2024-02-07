import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import * as AWS from 'aws-sdk';
import s3Configuration from 'lib/config/s3.configuration';
import { v4 as uuid } from 'uuid';

@Injectable()
export class AwsService {
  private s3: AWS.S3;

  constructor(
        @Inject(s3Configuration.KEY)
        private s3Config: ConfigType<typeof s3Configuration>,
    ) {
        this.s3 = new AWS.S3({
        region: s3Config.region,
        accessKeyId: s3Config.accessKeyId,
        secretAccessKey: s3Config.secretAccessKey,
        });
    }

    generateUploadURL(): Promise<string> {
        const myBucket = 'your_bucket_name';
        const myKey = `uploads/${uuid()}.jpeg`;
        const signedUrlExpireSeconds = 60 * 5; // URL expires in 5 minutes

        const url = this.s3.getSignedUrlPromise('putObject', {
        Bucket: myBucket,
        Key: myKey,
        Expires: signedUrlExpireSeconds,
        });

        return url;
    }
}
