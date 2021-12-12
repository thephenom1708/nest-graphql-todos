import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@/src/users/models/user.model';
import { JwtPayload } from '@/src/auth/types/jwt-payload';

@Injectable()
export class AuthService {
	constructor(private jwtService: JwtService) {}

	async login(user: User) {
		const payload: JwtPayload = {
			email: user.email,
			mobile: user.mobile ?? '',
			sub: user.id
		};
		return {
			accessToken: this.jwtService.sign(payload)
		};
	}
}
