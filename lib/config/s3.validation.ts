import * as Joi from 'joi';

export const s3ValidationSchema = Joi.object({
    S3_ACCESS_KEY_ID: Joi.string().required(),
    S3_SECRET_ACCESS_KEY: Joi.string().required(),
    S3_REGION: Joi.string().required(),
    S3_BUCKET: Joi.string().required(),
});