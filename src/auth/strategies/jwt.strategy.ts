import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from '@/src/users/models/user.model';
import { UsersService } from '@/src/users/users.service';
import { JwtPayload } from '@/src/auth/types/jwt-payload';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor(private readonly usersService: UsersService) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: false,
			secretOrKey: process.env['JWT_SECRET']
		});
	}

	async validate(validationPayload: JwtPayload): Promise<User | null> {
		const { sub: id } = validationPayload;
		return await this.usersService.findById(id);
	}
}
