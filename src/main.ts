import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	app.enableCors();

	const swaggerOptions = new DocumentBuilder()
		.setTitle('Todo Application REST services')
		.setVersion('1.0')
		.addBearerAuth({ type: 'http', in: 'header' }, 'access-token')
		.build();
	const document = SwaggerModule.createDocument(app, swaggerOptions);
	SwaggerModule.setup('docs', app, document);

	await app.listen(3000);
}
bootstrap();
