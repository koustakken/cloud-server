import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

import * as express from 'express';
import { join } from 'path';

async function bootstrap() {
	const app = await NestFactory.create(AppModule, { cors: false });
	// отключаем cors
	app.enableCors({ credentials: true, origin: true });
	// статические файлы
	app.use('/uploads', express.static(join(__dirname, '..', 'uploads')));
	// настройка swagger
	const config = new DocumentBuilder()
		.setTitle('Fullstack Cloud')
		.addBearerAuth()
		.setVersion('1.0')
		.build();
	const document = SwaggerModule.createDocument(app, config);
	SwaggerModule.setup('swagger', app, document, {
		swaggerOptions: {
			persistAuthorization: true,
		}
	});

	await app.listen(3000);
}
bootstrap();
