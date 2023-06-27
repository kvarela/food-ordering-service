import { Injectable } from '@nestjs/common'
import { RegisterRestaurantInput } from './dto/create-restaurant.input'
import { User } from '../users/entities/user.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Restaurant } from './entities/restaurant.entity'
import axios from 'axios'

@Injectable()
export class RestaurantService {
  constructor(@InjectRepository(Restaurant) private repo: Repository<Restaurant>) {}

  async register(user: User, createRestaurantInput: RegisterRestaurantInput) {
    const existingRestaurant = await this.repo.findOne({
      where: { name: createRestaurantInput.name, address: createRestaurantInput.address }
    })
    if (existingRestaurant) {
      throw new Error('Restaurant already exists')
    }

    const restaurant: Partial<Restaurant> = {
      ...createRestaurantInput,
      createdBy: user
    }

    // Get lat / long from address
    const { data } = await axios.get(`https://geocode.maps.co/search?q=${restaurant.address}`)
    if (data.length === 0) {
      throw new Error('Invalid address')
    }
    const { lat, lon } = data[0]

    restaurant.lat = lat
    restaurant.long = lon

    return this.repo.save(restaurant)
  }
}
