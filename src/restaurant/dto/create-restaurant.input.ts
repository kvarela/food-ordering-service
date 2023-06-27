import { InputType, Field } from '@nestjs/graphql'

@InputType()
export class RegisterRestaurantInput {
  @Field()
  name: string

  @Field()
  address: string
}
