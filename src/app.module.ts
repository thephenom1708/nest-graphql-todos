import { join } from 'path';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TodosModule } from '@/src/todos/todos.module';
import { AppService } from '@/src/app.service';
import { AppController } from '@/src/app.controller';
import { AuthService } from './auth/auth.service';
import { AuthModule } from '@/src/auth/auth.module';
import { UsersModule } from '@/src/users/users.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			envFilePath: join(process.cwd(), '.env')
		}),
		GraphQLModule.forRoot({
			autoSchemaFile: join(process.cwd(), 'src/schema.gql')
		}),
		MongooseModule.forRootAsync({
			useFactory: async (configService: ConfigService) => ({
				uri: configService.get<string>('MONGODB_URI')
			}),
			inject: [ConfigService]
		}),
		JwtModule.registerAsync({
			useFactory: async (configService: ConfigService) => ({
				secret: configService.get<string>('JWT_SECRET'),
				signOptions: { expiresIn: `${configService.get<number>('ACCESS_TOKEN_EXPIRY')}s` }
			}),
			inject: [ConfigService]
		}),
		AuthModule,
		UsersModule,
		TodosModule
	],
	controllers: [AppController],
	providers: [AppService, AuthService]
})
export class AppModule {}
