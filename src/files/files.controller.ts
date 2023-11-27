import { Controller, Post, Body, UseInterceptors, UploadedFile, ParseFilePipe, MaxFileSizeValidator, Get, UseGuards, Query, Delete } from '@nestjs/common';
import { FilesService } from './files.service';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';

import { storage } from './storage'
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { UserId } from 'src/decorators/user-id.decorator';

import { FileType } from './entities/file.entity';

@Controller('files')
// тег для swagger
@ApiTags('files')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class FilesController {
	constructor(private readonly filesService: FilesService) { }

	@Get()
	findAll(@UserId() userId: number, @Query('type') fileType: FileType) {
		return this.filesService.findAll(userId, fileType);
	}

	@Post()
	// декоратор для работы с файлами
	@UseInterceptors(FileInterceptor('file', { storage: storage }))
	// настройка swagger для загрузки файлов
	@ApiConsumes('multipart/form-data') // тип запроса
	@ApiBody({ // сама настройка swagger
		schema: {
			type: 'object',
			properties: {
				file: {
					type: 'string',
					format: 'binary',
				},
			}
		}
	})
	create(@UploadedFile(
		new ParseFilePipe(
			{
				validators: [
					// валидация на размер файла
					new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 5 }), // 5 мб
				]
			}
		)
	) file: Express.Multer.File, @UserId() userId: number) {
		return this.filesService.create(file, userId);
	}

	@Delete()
	remove(@UserId() userId: number, @Query('id') ids: string) {
		return this.filesService.remove(userId, ids);
	}
}
