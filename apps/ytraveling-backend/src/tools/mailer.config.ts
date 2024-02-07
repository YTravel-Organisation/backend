import * as nodemailer from 'nodemailer';
import { MailOptions } from 'nodemailer/lib/json-transport';

export class MailerService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.MAILER_HOST,
      port: Number(process.env.MAILER_PORT),
      secure: process.env.MAILER_SECURE === 'true',
      auth: {
        user: process.env.MAILER_USER,
        pass: process.env.MAILER_PASSWORD,
      },
    });
  }

  async sendMail(mailOptions: MailOptions): Promise<void> {
    try {
      const info = await this.transporter.sendMail(mailOptions);
      console.log('Email envoyé : ' + info.response);
    } catch (error) {
      console.error("Erreur lors de l'envoi de l'email : ", error);
    }
  }
}
