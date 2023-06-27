import { Resolver, Query } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { CurrentUser } from '../auth/current-user.decorator';

@Resolver()
export class UsersResolver {
  constructor(private readonly service: UsersService) {}

  @Query(() => User)
  async currentUser(@CurrentUser() user: User) {
    return user;
  }
}
