import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@/src/users/models/user.model';
import { AccessTokenPayload } from '@/src/auth/interfaces/access-token-payload.interface';
import { JwtPayload } from '@/src/auth/interfaces/jwt-payload.interface';
import { UsersService } from '@/src/users/users.service';

@Injectable()
export class AuthService {
	constructor(private readonly usersService: UsersService, private readonly jwtService: JwtService) {}

	async validate(email: string, password: string): Promise<User | null> {
		const user: User = await this.usersService.findByEmail(email);

		if (!user) {
			return null;
		}

		const isMatch: boolean = (user as any).comparePassword(password);
		return isMatch ? user : null;
	}

	login(user: User): AccessTokenPayload {
		const payload: JwtPayload = {
			email: user.email,
			sub: user.id
		};
		return {
			accessToken: this.jwtService.sign(payload)
		};
	}
}
