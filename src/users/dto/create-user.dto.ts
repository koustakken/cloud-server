import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
	// указываем какие свойства ожидаем от фронта и указываем swagger свойства
	@ApiProperty({ example: 'wN9g4@example.com', description: 'Email' })
	email: string;
	@ApiProperty({ example: '12345678', description: 'Password' })
	password: string;
	@ApiProperty({ example: 'John Doe', description: 'Full name' })
	fullName: string;
}
