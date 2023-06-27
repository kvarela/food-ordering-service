import { Resolver, Query } from '@nestjs/graphql'
import { User } from './entities/user.entity'
import { CurrentUser } from '../auth/current-user.decorator'
import { UseGuards } from '@nestjs/common'
import { JwtAuthGuard } from '../auth/jwt-auth.guard'

@Resolver()
export class UsersResolver {
  @Query(() => User)
  @UseGuards(JwtAuthGuard)
  async currentUser(@CurrentUser() user: User) {
    return user
  }
}
