import { Injectable } from '@nestjs/common';

import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {

	constructor(private usersService: UsersService) { }

	// метод проверки пользователя
	async validateUser(email: string, pass: string): Promise<any> {
		const user = await this.usersService.findByEmail(email);
		if (user && user.password === pass) {
			const { password, ...result } = user;
			return result;
		}
		return null;
	}
}
