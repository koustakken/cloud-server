import { Controller, Post, UseGuards, Request, Body } from '@nestjs/common';
import { ApiBody } from '@nestjs/swagger';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local.guard';

@Controller('auth')
export class AuthController {

	constructor(private authService: AuthService) { }

	@UseGuards(LocalAuthGuard)
	@Post('login')
	// настройка swagger
	@ApiBody({ type: CreateUserDto })
	async login(@Request() req) {
		return this.authService.login(req.user);
	}

	@Post('register')
	register(@Body() dto: CreateUserDto) {
		return this.authService.register(dto);
	}
}
