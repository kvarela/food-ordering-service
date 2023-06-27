import { registerEnumType } from '@nestjs/graphql';

export enum VerificationStatus {
  UNVERIFIED = 'unverified',
  EMAIL_VERIFIED = 'email_verified',
  VERIFIED = 'verified',
}

registerEnumType(VerificationStatus, {
  name: 'VerificationStatus',
});
