import { ObjectType, Field } from '@nestjs/graphql';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserRole } from './user-role.enum';
import { VerificationStatus } from '../../auth/verification-status.enum';

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @Field()
  id: string;

  @Column({ unique: true })
  @Field()
  email: string;

  @Column({ unique: true, nullable: true })
  @Field({ nullable: true })
  username: string;

  @Column()
  @Field()
  address: string;

  @Column({ unique: true })
  @Field()
  phone: string;

  @Column({ nullable: true })
  @Field({ description: 'Cloudinary public id', nullable: true })
  avatarId: string;

  @Column()
  password: string;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.USER })
  role: UserRole;

  @CreateDateColumn()
  @Field()
  createdAt: Date;

  @Column({
    type: 'enum',
    enum: VerificationStatus,
    default: VerificationStatus.UNVERIFIED,
  })
  @Field(() => VerificationStatus)
  verificationStatus: VerificationStatus;

  @Column({ nullable: true })
  emailVerificationCode: string;

  @Column({ nullable: true })
  phoneVerificationCode: string;

  // TODO: HASH AND SALT PASSWORDS
  comparePassword(password: string) {
    return password === this.password;
  }
}
