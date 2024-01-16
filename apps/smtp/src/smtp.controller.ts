import { Controller } from '@nestjs/common';
import { SmtpService } from './smtp.service';
import { MessagePattern } from '@nestjs/microservices';
import { ISendEmail } from 'lib/interfaces/smtp.interfaces';

@Controller()
export class SmtpController {
  constructor(private readonly smtpService: SmtpService) {}

  @MessagePattern('send_email')
  async sendVerificationEmail(data: ISendEmail) {
    return this.smtpService.SendEmail(data.to, data.subject, data.text);
  }
}
