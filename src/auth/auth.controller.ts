import { Controller, Post, UseGuards } from '@nestjs/common';
import { User } from '@/src/users/models/user.model';
import { AuthService } from '@/src/auth/auth.service';
import { LocalAuthGuard } from '@/src/auth/guards/local-auth.guard';
import { AccessTokenPayload } from '@/src/auth/interfaces/access-token-payload.interface';
import { CurrentUser } from '@/src/auth/decorators/current-user.decorator';

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Post('login')
	@UseGuards(LocalAuthGuard)
	async login(@CurrentUser() user: Partial<User>): Promise<AccessTokenPayload> {
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		return this.authService.login(user);
	}
}
