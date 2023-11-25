import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { FileEntity } from 'src/files/entities/file.entity';

@Entity('users')
export class UserEntity {
	@PrimaryGeneratedColumn()
	id: number;
	@Column()
	email: string;
	@Column()
	password: string;
	@Column()
	fullName: string;
	@OneToMany(() => FileEntity, (file) => file.user)
	files: FileEntity[];
}