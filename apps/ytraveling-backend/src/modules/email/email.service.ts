import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class EmailService {
  constructor(
    @Inject('SMTP_SERVICE')
    private readonly smtpProxy: ClientProxy,
  ) {}

  async sendWelcomeEmail(body: any) {
    this.smtpProxy.emit('welcome-email', body);
  }

  async sendVerificationEmail(body: any) {
    this.smtpProxy.emit('send-verification-email', body);
  }

  async sendResetPasswordEmail(body: any) {
    this.smtpProxy.emit('send-reset-password-email', body);
  }

  async sendBookingEmail(body: any) {
    this.smtpProxy.emit('send-booking-email', body);
  }

  async sendBookingConfirmationEmail(body: any) {
    this.smtpProxy.emit('send-confirmation-email', body);
  }

  async sendBookingCancellationEmail(body: any) {
    this.smtpProxy.emit('send-cancel-reservation-email', body);
  }

  async sendBookingRefundEmail(body: any) {
    this.smtpProxy.emit('send-booking-refund-email', body);
  }

  async sendDemandInformationEmail(body: any) {
    this.smtpProxy.emit('send-demand-information-email', body);
  }

  async sendDemandHelpEmail(body: any) {
    this.smtpProxy.emit('send-demand-help-email', body);
  }

  async sendPaymentConfirmationEmail(body: any) {
    this.smtpProxy.emit('send-payment-confirmation-email', body);
  }

  async sendRappelMonthEmail(body: any) {
    this.smtpProxy.emit('send-rappel-month-email', body);
  }

  async sendRappelWeekEmail(body: any) {
    this.smtpProxy.emit('send-rappel-week-email', body);
  }

  async sendSatisfactionEmail(body: any) {
    this.smtpProxy.emit('send-satisfaction-email', body);
  }

  async sendBookingUpdateEmail(body: any) {
    this.smtpProxy.emit('send-booking-update-email', body);
  }
}
