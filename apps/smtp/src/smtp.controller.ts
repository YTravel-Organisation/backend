import { Controller } from '@nestjs/common';
import { SmtpService } from './smtp.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class SmtpController {
  constructor(private readonly smtpService: SmtpService) {}

  @MessagePattern('welcome-email')
  sendWelcomeEmail(data: any) {
    return this.smtpService.sendWelcomeEmail(data);
  }

  @MessagePattern('send-verification-email')
  sendVerificationEmail(data: any) {
    return this.smtpService.sendVerificationEmail(data);
  }

  @MessagePattern('send-reset-password-email')
  sendForgotPasswordEmail(data: any) {
    return this.smtpService.sendForgotPasswordEmail(data);
  }

  @MessagePattern('send-booking-email')
  sendBookingEmail(data: any) {
    return this.smtpService.sendBookingEmail(data);
  }

  @MessagePattern('send-confirmation-email')
  sendBookingConfirmationEmail(data: any) {
    return this.smtpService.sendBookingConfirmationEmail(data);
  }

  @MessagePattern('send-cancel-reservation-email')
  sendBookingCancellationEmail(data: any) {
    return this.smtpService.sendBookingCancellationEmail(data);
  }

  @MessagePattern('send-booking-refund-email')
  sendBookingRefundEmail(data: any) {
    return this.smtpService.sendBookingRefundEmail(data);
  }

  @MessagePattern('send-demand-information-email')
  sendDemandInformationEmail(data: any) {
    return this.smtpService.sendDemandInformationEmail(data);
  }

  @MessagePattern('send-demand-help-email')
  sendDemandHelpEmail(data: any) {
    return this.smtpService.sendDemandHelpEmail(data);
  }

  @MessagePattern('send-payment-confirmation-email')
  sendPaymentConfirmationEmail(data: any) {
    return this.smtpService.sendPaymentConfirmationEmail(data);
  }

  @MessagePattern('send-rappel-month-email')
  sendRappelMonthEmail(data: any) {
    return this.smtpService.sendRappelMonthEmail(data);
  }

  @MessagePattern('send-rappel-week-email')
  sendRappelWeekEmail(data: any) {
    return this.smtpService.sendRappelWeekEmail(data);
  }

  @MessagePattern('send-satisfaction-email')
  sendSatisfactionEmail(data: any) {
    return this.smtpService.sendSatisfactionEmail(data);
  }

  @MessagePattern('send-booking-update-email')
  sendBookingUpdateEmail(data: any) {
    return this.smtpService.sendBookingUpdateEmail(data);
  }
}
