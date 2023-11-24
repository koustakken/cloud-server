import { Controller, Post, UseGuards, Request, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBody } from '@nestjs/swagger';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {

	constructor(private authService: AuthService) { }

	@UseGuards(AuthGuard('local'))
	@Post('login')
	// настройка swagger
	@ApiBody({ type: CreateUserDto })
	async login(@Request() req) {
		return req.user;
	}

	@Post('register')
	register(@Body() dto: CreateUserDto) {
		return this.authService.register(dto);
	}
}
