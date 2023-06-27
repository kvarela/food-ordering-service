import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { User } from '../users/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { VerificationStatus } from './verification-status.enum';
import { TokenPayload } from '../types/token-payload.type';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(email: string, password: string): Promise<User> {
    const user = await this.usersService.findOne({ where: { email } });

    if (!user) {
      throw new Error('User not found');
    }

    const isPasswordValid = await user.comparePassword(password);

    if (!isPasswordValid) {
      throw new Error('Invalid password');
    }

    return user;
  }

  async validateUser(id: string): Promise<User> {
    const user = await this.usersService.findOne({ where: { id } });

    return user;
  }

  async verifyEmail(email: string, code: string): Promise<User> {
    const user = await this.usersService.findOne({ where: { email } });

    if (!user) {
      throw new Error('User not found');
    }

    if (user.emailVerificationCode !== code) {
      throw new Error('Invalid verification code');
    }

    user.verificationStatus = VerificationStatus.EMAIL_VERIFIED;
    await user.save();

    return user;
  }

  async verifyPhone(
    phone: string,
    code: string,
  ): Promise<{ user: User; accessToken: string; refreshToken: string }> {
    const user = await this.usersService.findOne({ where: { phone } });

    if (!user) {
      throw new Error('User not found');
    }

    if (user.phoneVerificationCode !== code) {
      throw new Error('Invalid verification code');
    }

    const payload: TokenPayload = { sub: user.id };
    const accessToken = this.jwtService.sign(payload);
    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: '7d',
    });

    user.verificationStatus = VerificationStatus.VERIFIED;
    await user.save();

    return { user, accessToken, refreshToken };
  }
}
