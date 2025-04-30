import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Resend } from 'resend';

@Injectable()
export class MailService {
  private resendClient: Resend;

  constructor(private configService: ConfigService) {
    const resendApiKey = this.configService.get<string>('RESEND_API_KEY');
    this.resendClient = new Resend(resendApiKey);
  }
  async sendMail({
    subject,
    recipient,
    body,
  }: {
    subject: string;
    recipient: string;
    body?: string;
  }): Promise<void> {
    const configured_email: string | undefined =
      this.configService.get('MAIL_FROM');
    if (!configured_email)
      throw new Error('Developer email is not configured in the .env');
    try {
      await this.resendClient.emails.send({
        subject,
        from: configured_email,
        to: recipient,
        html: `<p>${body}</p>`,
      });
    } catch (error) {
      if (error instanceof Error) {
        throw new BadRequestException('Error sending email', {
          cause: new Error(),
          description: error.message,
        });
      }
      throw new Error('An Error occurred');
    }
  }
}
