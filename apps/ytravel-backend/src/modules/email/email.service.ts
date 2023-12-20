import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class EmailService {
  constructor(
    @Inject('SMTP_SERVICE')
    private readonly smtpProxy: ClientProxy,
  ) {}

  async sendVerificationEmail(to: string, token: string) {
    const subject = 'Verification Email';
    const text = `Pour valider votre compte, cliquez sur le lien suivant: http://localhost:3000/users/verify-email?token=${token}`;

    // Send email
    const payload = {
      to,
      subject,
      text,
    };
    this.smtpProxy.emit('send_email', payload);
  }
}
