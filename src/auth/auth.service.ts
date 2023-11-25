import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UserEntity } from 'src/users/entities/user.entity';

import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

	constructor(
		private jwtService: JwtService,
		private usersService: UsersService
	) { }

	// метод проверки пользователя
	async validateUser(email: string, pass: string): Promise<any> {
		const user = await this.usersService.findByEmail(email);
		if (user && user.password === pass) {
			const { password, ...result } = user;
			return result;
		}
		return null;
	}

	// регистрация пользователя
	async register(dto: CreateUserDto) {
		try {
			const data = await this.usersService.create(dto);
			return {
				token: this.jwtService.sign({ sub: data.id }),
			};
		} catch (error) {
			console.log(error);
			throw new ForbiddenException('Error on registration');
		}
	}

	// логин
	async login(user: UserEntity) {
		const payload = { sub: user.id }
		return {
			token: this.jwtService.sign(payload),
		}
	}
}
