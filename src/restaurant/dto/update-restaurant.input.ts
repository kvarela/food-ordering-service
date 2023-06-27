import { RegisterRestaurantInput } from './create-restaurant.input'
import { InputType, Field, Int, PartialType } from '@nestjs/graphql'

@InputType()
export class UpdateRestaurantInput extends PartialType(RegisterRestaurantInput) {
  @Field(() => Int)
  id: number
}
