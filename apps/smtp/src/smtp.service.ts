import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class SmtpService {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: 'mailhog',
      port: 1025,
      ignoreTLS: true,
    });
  }

  async SendEmail(to: string, subject: string, text: string) {
    const info = await this.transporter.sendMail({
      from: 'no-reply@ytraveling.com',
      to: to,
      subject: subject,
      text: text,
    });

    console.log('Message sent: %s', info.messageId); // debug
  }

  async sendWelcomeEmail(body: any) {
    const subject = 'Bienvenue sur YTraveling - Compte activé !';
    const text = `
      Bonjour ${body.firstName} ${body.lastName},

      Félicitations ! Votre compte YTravel est maintenant activé et vous êtes prêt à explorer le monde avec nous. Commencez dès maintenant à utiliser notre plateforme pour une expérience de voyage inoubliable.

      Si vous avez des questions ou besoin d'assistance, notre équipe est toujours là pour vous aider.

      Cordialement,
      L'équipe YTraveling`;
    this.SendEmail(body.to, subject, text);
  }

  async sendVerificationEmail(body: any) {
    const subject = 'Confirmez votre adresse e-mail pour YTraveling';
    const text = `
      Bonjour ${body.firstName} ${body.lastName},

      Merci de vous être inscrit sur YTraveling. Pour activer votre compte et commencer à utiliser notre plateforme, veuillez confirmer votre adresse e-mail en cliquant sur le lien suivant : ${body.verificationLink}

      Si vous n'avez pas créé de compte sur YTraveling, veuillez ignorer cet e-mail.

      Cordialement,
      L'équipe YTraveling`;
    this.SendEmail(body.to, subject, text);
  }

  async sendForgotPasswordEmail(body: any) {
    const subject = 'Réinitialisation de votre mot de passe YTraveling';
    const text = `
      Bonjour ${body.firstName} ${body.lastName},

      Vous avez demandé une réinitialisation de mot de passe pour votre compte YTraveling. Pour réinitialiser votre mot de passe, veuillez cliquer sur le lien suivant : ${body.resetPasswordLink}

      Si vous n'avez pas demandé de réinitialisation de mot de passe, veuillez ignorer cet e-mail.

      Cordialement,
      L'équipe YTraveling`;
    this.SendEmail(body.to, subject, text);
  }

  async sendBookingEmail(body: any) {
    const subject = `Réception de votre demande de réservation chez YTraveling - Réservation ${body.bookingId}`;
    const text = `
      Bonjour ${body.firstName} ${body.lastName},
      Nous vous informons que nous avons bien reçu votre demande de réservation. Elle est actuellement en cours de traitement. Vous recevrez bientôt une confirmation détaillée une fois que votre réservation aura été validée.

      Détails de la réservation :
      - ID de la réservation : ${body.bookingId}

      Si vous avez des questions ou besoin d'assistance, n'hésitez pas à nous contacter.

      Cordialement,
      L'équipe YTraveling`;
    this.SendEmail(body.to, subject, text);
  }

  async sendBookingConfirmationEmail(body: any) {
    const subject = `Confirmation de votre réservation chez YTraveling - Réservation ${body.bookingId}`;
    const text = `
      Bonjour ${body.firstName} ${body.lastName},
      Nous sommes heureux de vous confirmer que votre réservation a été validée. Vous trouverez ci-dessous les détails de votre réservation.

      Détails de la réservation :
      - ID de la réservation : ${body.bookingId}
      - Date de début : ${body.startDate}
      - Date de fin : ${body.endDate}
      - Montant total : ${body.totalAmount} ${body.currency}

      Si vous avez des questions ou besoin d'assistance, n'hésitez pas à nous contacter.

      Cordialement,
      L'équipe YTraveling`;
    this.SendEmail(body.to, subject, text);
  }

  async sendBookingCancellationEmail(body: any) {
    const subject = `Annulation de votre réservation chez YTraveling - Réservation ${body.bookingId}`;
    const text = `
      Bonjour ${body.firstName} ${body.lastName},
      Nous vous informons que votre réservation a été annulée. Vous trouverez ci-dessous les détails de votre réservation.

      Détails de la réservation :
      - ID de la réservation : ${body.bookingId}
      - Date de début : ${body.startDate}
      - Date de fin : ${body.endDate}
      - Montant total : ${body.totalAmount} ${body.currency}

      Si vous avez des questions ou besoin d'assistance, n'hésitez pas à nous contacter.

      Cordialement,
      L'équipe YTraveling`;
    this.SendEmail(body.to, subject, text);
  }

  async sendBookingRefundEmail(body: any) {
    const subject = `Remboursement de votre réservation chez YTraveling - Réservation ${body.bookingId}`;
    const text = `
      Bonjour ${body.firstName} ${body.lastName},
      Nous vous informons que votre réservation a été remboursée. Vous trouverez ci-dessous les détails de votre réservation.

      Détails de la réservation :
      - ID de la réservation : ${body.bookingId}
      - Date de début : ${body.startDate}
      - Date de fin : ${body.endDate}
      - Montant total : ${body.totalAmount} ${body.currency}

      Si vous avez des questions ou besoin d'assistance, n'hésitez pas à nous contacter.

      Cordialement,
      L'équipe YTraveling`;
    this.SendEmail(body.to, subject, text);
  }

  async sendDemandInformationEmail(body: any) {
    const subject = `Demande d'informations sur votre annonce chez YTraveling - Annonce ${body.adId}`;
    const text = `
      Bonjour ${body.firstName} ${body.lastName},
      Nous vous informons que nous avons bien reçu votre demande d'informations sur l'annonce ${body.adId}. Nous vous répondrons dans les plus brefs délais.

      Si vous avez des questions ou besoin d'assistance, n'hésitez pas à nous contacter.

      Cordialement,
      L'équipe YTraveling`;
    this.SendEmail(body.to, subject, text);
  }

  async sendDemandHelpEmail(body: any) {
    const subject = `Demande d'assistance chez YTraveling`;
    const text = `
      Bonjour ${body.firstName} ${body.lastName},
      Nous vous informons que nous avons bien reçu votre demande d'assistance. Nous vous répondrons dans les plus brefs délais.

      Si vous avez des questions ou besoin d'assistance, n'hésitez pas à nous contacter.

      Cordialement,
      L'équipe YTraveling`;
    this.SendEmail(body.to, subject, text);
  }

  async sendPaymentConfirmationEmail(body: any) {
    const subject = `Confirmation de paiement chez YTraveling - Commande ${body.orderId}`;
    const text = `
      Bonjour ${body.firstName} ${body.lastName},
      Nous vous informons que votre paiement a bien été effectué. Vous trouverez ci-dessous les détails de votre paiement.

      Détails du paiement :
      - ID de la commande : ${body.orderId}
      - Montant total : ${body.totalAmount} ${body.currency}

      Si vous avez des questions ou besoin d'assistance, n'hésitez pas à nous contacter.

      Cordialement,
      L'équipe YTraveling`;
    this.SendEmail(body.to, subject, text);
  }

  async sendRappelMonthEmail(body: any) {
    const subject = `Rappel de votre réservation chez YTraveling - Réservation ${body.bookingId}`;
    const text = `
      Bonjour ${body.firstName} ${body.lastName},
      Nous vous rappelons que votre réservation ${body.bookingId} est prévue pour le mois prochain. Nous vous invitons à vérifier les détails de votre réservation et à nous contacter si vous avez des questions ou besoin d'assistance.

      Cordialement,
      L'équipe YTraveling`;
    this.SendEmail(body.to, subject, text);
  }

  async sendRappelWeekEmail(body: any) {
    const subject = `Rappel de votre réservation chez YTraveling - Réservation ${body.bookingId}`;
    const text = `
      Bonjour ${body.firstName} ${body.lastName},
      Nous vous rappelons que votre réservation ${body.bookingId} est prévue pour la semaine prochaine. Nous vous invitons à vérifier les détails de votre réservation et à nous contacter si vous avez des questions ou besoin d'assistance.

      Cordialement,
      L'équipe YTraveling`;
    this.SendEmail(body.to, subject, text);
  }

  async sendSatisfactionEmail(body: any) {
    const subject = `Votre avis sur votre réservation chez YTraveling - Réservation ${body.bookingId}`;
    const text = `
      Bonjour ${body.firstName} ${body.lastName},
      Nous espérons que vous avez passé un excellent séjour avec YTraveling. Votre avis est important pour nous. Merci de prendre quelques minutes pour nous donner votre avis sur votre expérience.

      Cordialement,
      L'équipe YTraveling`;
    this.SendEmail(body.to, subject, text);
  }

  async sendBookingUpdateEmail(body: any) {
    const subject = `Mise à jour de votre réservation chez YTraveling - Réservation ${body.bookingId}`;
    const text = `
      Bonjour ${body.firstName} ${body.lastName},
      Nous vous informons que votre réservation ${body.bookingId} a été mise à jour. Vous trouverez ci-dessous les détails de votre réservation.

      Détails de la réservation :
      - ID de la réservation : ${body.bookingId}
      - Date de début : ${body.startDate}
      - Date de fin : ${body.endDate}
      - Montant total : ${body.totalAmount} ${body.currency}

      Si vous avez des questions ou besoin d'assistance, n'hésitez pas à nous contacter.

      Cordialement,
      L'équipe YTraveling`;
    this.SendEmail(body.to, subject, text);
  }
}
