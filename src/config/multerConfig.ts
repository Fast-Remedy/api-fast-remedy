import multer from 'multer';
import crypto from 'crypto';
import { resolve, extname } from 'path';
import sharp from 'sharp';

export default {
	storage: multer.diskStorage({
		destination: (req, res, cb) => {
			cb(null, resolve(__dirname, '..', '..', 'temp', 'uploads', 'images'));
		},
		filename: (req, file, cb) => {
			crypto.randomBytes(16, (err, res) => {
				if (err) return console.log(cb(err));
				return cb(null, `${res.toString('hex')}-${extname(file.originalname)}`);
			});
		},
		limits: {
			fileSize: 2 * 1024 * 1024,
		},
	}),
};
