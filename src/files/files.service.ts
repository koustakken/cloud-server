import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FileEntity } from './entities/file.entity';
import { Repository } from 'typeorm';

import { FileType } from './entities/file.entity';

@Injectable()
export class FilesService {
	constructor(
		@InjectRepository(FileEntity)
		private fileRepository: Repository<FileEntity>
	) { }

	findAll(userId: number, fileType: FileType) {
		const qb = this.fileRepository.createQueryBuilder('file');
		qb.where('file.userId = :userId', { userId });

		if (fileType === FileType.PHOTOS) {
			qb.andWhere('file.mimetype ILIKE :type', { mimetype: '%image%' });
		}

		if (fileType === FileType.TRASH) {
			qb.andWhere('file.deletedAt IS NOT NULL');
		}

		return qb.getMany();
	}

	create(file: Express.Multer.File, userId: number) {
		return this.fileRepository.save({
			fileName: file.filename,
			originalName: file.originalname,
			size: file.size,
			mimetype: file.mimetype,
			user: { id: userId }
		})
	}

	remove(userId: number, ids: string) {
		const idsArray = ids.split(',');
		const qb = this.fileRepository.createQueryBuilder('file');

		qb.where('id IN (:...ids) AND userId = :userId', { ids: idsArray, userId });

		return qb.softDelete().execute();
	}
}
