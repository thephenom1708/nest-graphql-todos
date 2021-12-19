import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from '@/src/users/users.module';
import { AuthService } from '@/src/auth/auth.service';
import { AuthController } from '@/src/auth/auth.controller';
import { JwtStrategy } from '@/src/auth/strategies/jwt.strategy';
import { LocalStrategy } from '@/src/auth/strategies/local.strategy';

@Module({
	imports: [
		UsersModule,
		PassportModule.register({ defaultStrategy: 'jwt' }),
		JwtModule.registerAsync({
			useFactory: async (configService: ConfigService) => ({
				secret: configService.get<string>('JWT_SECRET'),
				signOptions: { expiresIn: `${configService.get<number>('ACCESS_TOKEN_EXPIRY')}s` }
			}),
			inject: [ConfigService]
		})
	],
	providers: [AuthService, JwtStrategy, LocalStrategy],
	controllers: [AuthController]
})
export class AuthModule {}
