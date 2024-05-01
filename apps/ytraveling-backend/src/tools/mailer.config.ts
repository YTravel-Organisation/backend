import * as nodemailer from 'nodemailer';
import { MailOptions } from 'nodemailer/lib/json-transport';

export class MailerService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.MAILGUN_SMTP_SERVER,
      port: Number(process.env.MAILGUN_SMTP_PORT),
      auth: {
        user: process.env.MAILGUN_SMTP_LOGIN,
        pass: process.env.MAILGUN_SMTP_PASSWORD,
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
