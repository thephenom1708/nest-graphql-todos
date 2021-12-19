import { ApiProperty } from '@nestjs/swagger';

export class LoginEmailPasswordInput {
	@ApiProperty({ required: true })
	email: string;

	@ApiProperty({ required: true })
	password: string;
}
