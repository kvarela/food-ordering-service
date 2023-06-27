import { Injectable } from '@nestjs/common'
import { UsersService } from '../users/users.service'
import { User } from '../users/entities/user.entity'
import { JwtService } from '@nestjs/jwt'
import { VerificationStatus } from './verification-status.enum'
import { TokenPayload } from '../types/token-payload.type'
import { EmailService } from '../email/email.service'
import { SmsService } from '../sms/sms.service'

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private emailService: EmailService,
    private readonly smsService: SmsService
  ) {}

  async register(data: Partial<User>): Promise<User> {
    const existingUserByEmail = await this.usersService.findOne({ where: { email: data.email } })
    if (existingUserByEmail) {
      throw new Error('That email is already registered')
    }

    const existingUserByUsername = await this.usersService.findOne({ where: { username: data.username } })
    if (existingUserByUsername) {
      throw new Error('That username is already registered')
    }

    const user = await this.usersService.create(data)

    // Send email verification code
    const emailVerificationCode = Math.floor(100000 + Math.random() * 900000).toString()
    user.emailVerificationCode = emailVerificationCode
    await user.save()

    await this.emailService.send(
      user.email,
      'Welcome to Space Food Runners!',
      `Your verification code is ${emailVerificationCode}`
    )

    return user
  }

  async login(email: string, password: string): Promise<User> {
    const user = await this.usersService.findOne({ where: { email } })

    if (!user) {
      throw new Error('User not found')
    }

    // If the user is not at least email verified, throw an error
    if (user.verificationStatus === VerificationStatus.UNVERIFIED) {
      throw new Error('User has not verified email yet')
    }

    const isPasswordValid = await user.comparePassword(password)

    if (!isPasswordValid) {
      throw new Error('Invalid password')
    }

    user.verificationStatus = VerificationStatus.EMAIL_AND_PASSWORD_VERIFIED
    await user.save()

    // Send phone verification code
    const phoneVerificationCode = Math.floor(100000 + Math.random() * 900000).toString()
    user.phoneVerificationCode = phoneVerificationCode
    await user.save()

    await this.smsService.send(user.phone, `Your Space Food Runners verification code is ${phoneVerificationCode}`)

    return user
  }

  async validateUser(id: string): Promise<User> {
    const user = await this.usersService.findOne({ where: { id } })

    return user
  }

  async verifyEmail(email: string, code: string): Promise<User> {
    const user = await this.usersService.findOne({ where: { email } })

    if (!user) {
      throw new Error('User not found')
    }

    if (user.emailVerificationCode !== code) {
      throw new Error('Invalid verification code')
    }

    user.verificationStatus = VerificationStatus.EMAIL_VERIFIED
    await user.save()

    return user
  }

  async verifyPhone(phone: string, code: string): Promise<{ user: User; accessToken: string; refreshToken: string }> {
    const user = await this.usersService.findOne({ where: { phone } })

    if (!user) {
      throw new Error('User not found')
    }

    if (user.phoneVerificationCode !== code) {
      throw new Error('Invalid verification code')
    }

    if (
      user.verificationStatus === VerificationStatus.EMAIL_VERIFIED ||
      user.verificationStatus === VerificationStatus.UNVERIFIED
    ) {
      throw new Error('User has not verified email and password yet')
    }

    const payload: TokenPayload = { sub: user.id }
    const accessToken = this.jwtService.sign(payload, { secret: process.env.JWT_SECRET })
    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: '7d',
      secret: process.env.JWT_SECRET
    })

    user.verificationStatus = VerificationStatus.EMAIL_PASSWORD_AND_PHONE_VERIFEID
    await user.save()

    console.log({ user, accessToken, refreshToken })

    return { user, accessToken, refreshToken }
  }
}
