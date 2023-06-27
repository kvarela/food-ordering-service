import { Test, TestingModule } from '@nestjs/testing'
import { AuthResolver } from './auth.resolver'
import { TypeOrmModule } from '@nestjs/typeorm'
import { testConfig } from '../database/database.config'
import { faker } from '@faker-js/faker'
import { AuthService } from './auth.service'
import { UsersService } from '../users/users.service'
import { JwtService } from '@nestjs/jwt'
import { EmailService } from '../email/email.service'
import { SmsService } from '../sms/sms.service'
import { User } from '../users/entities/user.entity'
import { MailService } from '@sendgrid/mail'
import { VerificationStatus } from './verification-status.enum'
import { MockSmsService } from '../../test/sms-service.mock'

describe('AuthResolver', () => {
  let resolver: AuthResolver

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot(testConfig), TypeOrmModule.forFeature([User])],
      providers: [
        AuthResolver,
        AuthService,
        UsersService,
        JwtService,
        MailService,
        EmailService,
        {
          provide: SmsService,
          useClass: MockSmsService
        }
      ]
    }).compile()

    resolver = module.get<AuthResolver>(AuthResolver)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })

  describe('register()', () => {
    it('should return a user', async () => {
      const user = await resolver.register(
        faker.internet.email(),
        faker.internet.password(),
        faker.internet.userName(),
        faker.phone.number()
      )

      expect(user).toBeDefined()
    })
  })

  describe('verifyEmail()', () => {
    it('should successfully verify email', async () => {
      const user = await resolver.register(
        faker.internet.email(),
        faker.internet.password(),
        faker.internet.userName(),
        faker.phone.number()
      )

      const verifiedUser = await resolver.verifyEmail(user.email, user.emailVerificationCode)

      expect(verifiedUser).toBeDefined()
      expect(verifiedUser.verificationStatus).toBe(VerificationStatus.EMAIL_VERIFIED)
    })
  })

  describe('login()', () => {
    it('should successfully log in', async () => {
      const user = await resolver.register(
        faker.internet.email(),
        faker.internet.password(),
        faker.internet.userName(),
        faker.phone.number()
      )

      await resolver.verifyEmail(user.email, user.emailVerificationCode)
      const loggedInUser = await resolver.login(user.email, user.password)

      expect(loggedInUser.verificationStatus).toBe(VerificationStatus.EMAIL_AND_PASSWORD_VERIFIED)
    })
  })

  describe('verifyPhone()', () => {
    it('should successfully verify phone', async () => {
      let user = await resolver.register(
        faker.internet.email(),
        faker.internet.password(),
        faker.internet.userName(),
        faker.phone.number()
      )

      await resolver.verifyEmail(user.email, user.emailVerificationCode)
      user = await resolver.login(user.email, user.password)

      const verifyPhoneResponse = await resolver.verifyPhone(user.phone, user.phoneVerificationCode)
      expect(verifyPhoneResponse).toBeDefined()
      expect(verifyPhoneResponse.user.verificationStatus).toBe(
        VerificationStatus.EMAIL_PASSWORD_AND_PHONE_VERIFEID
      )
    })
  })
})
