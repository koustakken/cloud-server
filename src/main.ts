import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
	const app = await NestFactory.create(AppModule, { cors: false });
	// отключаем cors
	app.enableCors({ credentials: true, origin: true });
	// настройка swagger
	const config = new DocumentBuilder()
		.setTitle('Fullstack Cloud')
		.setVersion('1.0')
		.build();
	const document = SwaggerModule.createDocument(app, config);
	SwaggerModule.setup('swagger', app, document);

	await app.listen(3000);
}
bootstrap();
