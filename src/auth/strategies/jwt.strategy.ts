import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersService } from '@/src/users/users.service';
import { User } from '@/src/users/models/user.model';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor(private readonly usersService: UsersService) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: false,
			secretOrKey: process.env['JWT_SECRET']
		});
	}

	async validate(validationPayload: { email: string; sub: string }): Promise<User | null> {
		return await this.usersService.findByEmail(validationPayload.email);
	}
}
