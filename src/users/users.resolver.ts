import { Resolver, Query } from '@nestjs/graphql'
import { User } from './entities/user.entity'
import { CurrentUser } from '../auth/current-user.decorator'

@Resolver()
export class UsersResolver {
  @Query(() => User)
  async currentUser(@CurrentUser() user: User) {
    return user
  }
}
