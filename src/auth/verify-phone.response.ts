import { Field, ObjectType } from '@nestjs/graphql'
import { User } from '../users/entities/user.entity'

@ObjectType()
export class VerifyPhoneResponse {
  @Field(() => User)
  user: User

  @Field()
  accessToken: string

  @Field()
  refreshToken: string
}
