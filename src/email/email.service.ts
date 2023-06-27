import { Injectable } from '@nestjs/common'
import { MailDataRequired, MailService } from '@sendgrid/mail'

@Injectable()
export class EmailService {
  constructor(private readonly mailService: MailService) {
    this.mailService.setApiKey(process.env.SENDGRID_API_KEY)
  }

  async send(to: string, subject: string, html: string): Promise<void> {
    const email: MailDataRequired = {
      to,
      subject,
      html,
      from: 'karim@civilizedsoftware.com'
    }

    try {
      await this.mailService.send(email)
    } catch (error) {
      // Handle any errors that occur during email sending
      console.error('Error sending email:', error)
      console.error({ errors: error.response.body.errors })
      throw new Error('Failed to send email')
    }
  }
}
