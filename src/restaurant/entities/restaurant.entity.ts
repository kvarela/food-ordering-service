import { ObjectType, Field, Int, Float } from '@nestjs/graphql'
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { User } from '../../users/entities/user.entity'

@ObjectType()
@Entity()
export class Restaurant {
  @PrimaryGeneratedColumn('uuid')
  @Field()
  id: string

  @Column()
  @Field()
  name: string

  @Column()
  @Field()
  address: string

  @Column({ type: 'float' })
  @Field(() => Float)
  lat: number

  @Column({ type: 'float' })
  @Field(() => Float)
  long: number

  @CreateDateColumn()
  @Field()
  createdAt: Date

  @ManyToOne(() => User, (user) => user.restaurantsCreated)
  @Field(() => User)
  createdBy: User
}
