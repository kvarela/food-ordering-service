import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from './entities/user.entity'
import { FindOneOptions, Repository } from 'typeorm'

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  async create(data: Partial<User>): Promise<User> {
    const user = await this.repo.create(data)
    await this.repo.save(user)

    return user
  }

  async findOne(findOneOptions: FindOneOptions<User>): Promise<User> {
    return this.repo.findOne(findOneOptions)
  }
}
