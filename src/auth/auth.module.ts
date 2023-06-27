import { Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { UsersModule } from '../users/users.module'
import { PassportModule } from '@nestjs/passport'
import { JwtStrategy } from './jwt.strategy'
import { AuthResolver } from './auth.resolver'
import { JwtModule, JwtService } from '@nestjs/jwt'
import { EmailService } from '../email/email.service'
import { MailService } from '@sendgrid/mail'
import { SmsService } from '../sms/sms.service'

@Module({
  imports: [
    PassportModule,
    UsersModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1d' }
    })
  ],
  providers: [AuthService, EmailService, MailService, JwtService, JwtStrategy, AuthResolver, SmsService]
})
export class AuthModule {}
