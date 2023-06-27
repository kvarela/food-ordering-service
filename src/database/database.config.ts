import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import * as dotenv from 'dotenv';

dotenv.config();

console.log('process.env.DATABASE_URL', process.env.DATABASE_URL);

export const config: TypeOrmModuleOptions = {
  type: 'postgres',
  url: process.env.DATABASE_URL,
  // entities: ['dist/**/*.entity{.ts,.js}'],
  entities: [User],
  synchronize: true,
};
