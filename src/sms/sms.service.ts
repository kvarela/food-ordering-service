import { Injectable } from '@nestjs/common'
import * as Twilio from 'twilio'

@Injectable()
export class SmsService {
  private readonly twilioClient: Twilio.Twilio

  constructor() {
    this.twilioClient = Twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN)
  }

  async send(to: string, body: string): Promise<void> {
    try {
      await this.twilioClient.messages.create({
        body,
        to,
        from: process.env.TWILIO_PHONE_NUMBER
      })
    } catch (error) {
      // Handle any errors that occur during SMS sending
      console.error('Error sending SMS:', error)
      throw new Error('Failed to send SMS')
    }
  }
}
