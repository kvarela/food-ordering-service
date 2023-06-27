import { Injectable } from '@nestjs/common'
import { SmsService } from '../src/sms/sms.service'

@Injectable()
export class MockSmsService extends SmsService {
  override async send(to: string, body: string) {
    console.log(`Mock SMS sent to ${to}: ${body}`)
  }
}
