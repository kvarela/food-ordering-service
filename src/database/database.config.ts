import { TypeOrmModuleOptions } from '@nestjs/typeorm'
import * as dotenv from 'dotenv'
import { User } from '../users/entities/user.entity'
import { Restaurant } from '../restaurant/entities/restaurant.entity'

dotenv.config()

console.log('process.env.DATABASE_URL', process.env.DATABASE_URL)

export const config: TypeOrmModuleOptions = {
  type: 'postgres',
  url: process.env.DATABASE_URL,
  entities: ['dist/**/*.entity{.ts,.js}'],
  synchronize: true // TODO: set to false in production and run migrations instead
}

export const testConfig: TypeOrmModuleOptions = {
  ...config,
  url: process.env.DATABASE_URL_TEST,
  dropSchema: true,
  entities: [Restaurant, User]
}
