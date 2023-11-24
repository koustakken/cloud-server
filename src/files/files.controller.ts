import { Controller, Post, Body, UseInterceptors, UploadedFile, ParseFilePipe, MaxFileSizeValidator, Get } from '@nestjs/common';
import { FilesService } from './files.service';
import { CreateFileDto } from './dto/create-file.dto';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';

import { storage } from './storage'

@Controller('files')
// тег для swagger
@ApiTags('files')
export class FilesController {
	constructor(private readonly filesService: FilesService) { }

	@Get()
	findAll() {
		return this.filesService.findAll();
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
	) file: Express.Multer.File) {
		return file;
	}

}
