import { registerEnumType } from '@nestjs/graphql'

export enum VerificationStatus {
  UNVERIFIED = 'unverified',
  EMAIL_VERIFIED = 'email_verified',
  EMAIL_AND_PASSWORD_VERIFIED = 'email_and_password_verified',
  EMAIL_PASSWORD_AND_PHONE_VERIFEID = 'email_password_and_phone_verified'
}

registerEnumType(VerificationStatus, {
  name: 'VerificationStatus'
})
