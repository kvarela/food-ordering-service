import { Args, Mutation, Resolver } from '@nestjs/graphql'
import { UsersService } from '../users/users.service'
import { AuthService } from './auth.service'
import { User } from '../users/entities/user.entity'

@Resolver()
export class AuthResolver {
  constructor(private readonly service: AuthService, private readonly usersService: UsersService) {}

  @Mutation(() => User)
  async login(@Args('email') email: string, @Args('password') password: string): Promise<User> {
    const user = await this.service.login(email, password)

    return user
  }

  @Mutation(() => User)
  async register(
    @Args('email') email: string,
    @Args('password') password: string,
    @Args('username') username: string,
    @Args('phone') phone: string
  ): Promise<User> {
    const user = await this.service.register({
      email,
      password,
      username,
      phone
    })

    return user
  }

  @Mutation(() => User)
  async verifyEmail(@Args('email') email: string, @Args('code') code: string): Promise<User> {
    const user = await this.service.verifyEmail(email, code)

    return user
  }

  @Mutation(() => User)
  async verifyPhone(
    @Args('phone') phone: string,
    @Args('code') code: string
  ): Promise<{
    user: User
    accessToken: string
    refreshToken: string
  }> {
    const { user, accessToken, refreshToken } = await this.service.verifyPhone(phone, code)

    return {
      user,
      accessToken,
      refreshToken
    }
  }
}
