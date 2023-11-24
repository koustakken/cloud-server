import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';

import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
	constructor(
		@InjectRepository(UserEntity)
		private usersRepository: Repository<UserEntity>,
	) { }

	// поиск по email
	async findByEmail(email: string): Promise<UserEntity> {
		return this.usersRepository.findOne({ where: { email } });
	}

	// поиск по id
	async findById(id: number): Promise<UserEntity> {
		return this.usersRepository.findOne({ where: { id } });
	}

	// создание пользователя
	create(dto: CreateUserDto) {
		return this.usersRepository.save(dto);
	}
}
