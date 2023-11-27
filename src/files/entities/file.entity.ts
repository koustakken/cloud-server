import { Column, Entity, PrimaryGeneratedColumn, DeleteDateColumn, ManyToOne } from 'typeorm';
import { UserEntity } from 'src/users/entities/user.entity';

export enum FileType {
	PHOTOS = 'photos',
	TRASH = 'trash',
}

@Entity('files')
export class FileEntity {
	@PrimaryGeneratedColumn()
	id: number;
	@Column()
	name: string;
	@Column()
	originalName: string;
	@Column()
	size: number;
	@Column()
	mimetype: string;
	@DeleteDateColumn()
	deletedAt: Date;
	@ManyToOne(() => UserEntity, (user) => user.files)
	user: UserEntity;
}
