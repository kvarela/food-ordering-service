import { Resolver, Mutation, Args } from '@nestjs/graphql'
import { RestaurantService } from './restaurant.service'
import { Restaurant } from './entities/restaurant.entity'
import { RegisterRestaurantInput } from './dto/create-restaurant.input'
import { CurrentUser } from '../auth/current-user.decorator'
import { JwtAuthGuard } from '../auth/jwt-auth.guard'
import { UseGuards } from '@nestjs/common'

@Resolver(() => Restaurant)
export class RestaurantResolver {
  constructor(private readonly restaurantService: RestaurantService) {}

  @Mutation(() => Restaurant)
  @UseGuards(JwtAuthGuard)
  registerRestaurant(
    @CurrentUser() user,
    @Args('createRestaurantInput') createRestaurantInput: RegisterRestaurantInput
  ) {
    return this.restaurantService.register(user, createRestaurantInput)
  }
}
