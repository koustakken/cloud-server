// storage for multer
import { diskStorage } from 'multer';

// генерация id
const genereateId = () =>
	Array(18)
		.fill(null)
		.map(() => Math.round(Math.random() * 16).toString(16))
		.join('');

// нормализация имени
const normalizeFileName = (req, file, callback) => {
	const fileExtName = file.originalname.split('.').pop();
	callback(null, `${genereateId()}.${fileExtName}`);
}

export const storage = diskStorage({
	destination: ('./uploads'),
	filename: normalizeFileName
});