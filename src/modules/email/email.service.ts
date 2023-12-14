import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: 'mailhog',
      port: 1025,
      ignoreTLS: true,
    });
  }

  async sendVerificationEmail(to: string, token: string) {
    const subject = 'Verification Email';
    const text = `Pour valider votre compte, cliquez sur le lien suivant: http://localhost:3000/users/verify-email?token=${token}`;

    const info = await this.transporter.sendMail({
      from: 'no-reply@ytravel.com',
      to: to,
      subject: subject,
      text: text,
    });

    console.log('Message sent: %s', info.messageId);
  }
}
