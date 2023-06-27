import { Injectable } from '@nestjs/common'
import { RegisterRestaurantInput } from './dto/create-restaurant.input'
import { User } from '../users/entities/user.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Restaurant } from './entities/restaurant.entity'

@Injectable()
export class RestaurantService {
  constructor(@InjectRepository(Restaurant) private repo: Repository<Restaurant>) {}

  register(user: User, createRestaurantInput: RegisterRestaurantInput) {
    const restaurant = {
      ...createRestaurantInput,
      createdBy: user
    }

    return this.repo.save(restaurant)
  }
}
