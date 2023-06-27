import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { config } from './database/database.config'
import { GraphQLModule } from '@nestjs/graphql'
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { UsersModule } from './users/users.module'
import { AuthModule } from './auth/auth.module'
import { RestaurantModule } from './restaurant/restaurant.module'

@Module({
  imports: [
    TypeOrmModule.forRoot(config),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: true,
      autoSchemaFile: true,
      sortSchema: true
    }),
    UsersModule,
    AuthModule,
    RestaurantModule
  ],
  controllers: [AppController]
})
export class AppModule {}
