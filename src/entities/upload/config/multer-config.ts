import { BadRequestException, Injectable } from '@nestjs/common';
import {
  MulterModuleOptions,
  MulterOptionsFactory,
} from '@nestjs/platform-express';
import * as fs from 'fs';
import { diskStorage } from 'multer';

@Injectable()
export class MulterConfigService implements MulterOptionsFactory {
  createMulterOptions(): MulterModuleOptions {
    return {
      storage: diskStorage({
        destination: (req, file, callback) => {
          const directory = `./temp`;
          if (!fs.existsSync(directory)) {
            fs.mkdirSync(directory, { recursive: true });
          }
          callback(null, directory);
        },
        filename: (req, file, callback) => {
          const fileName = Date.now() + file.originalname;
          callback(null, `${fileName}`);
        },
      }),
      fileFilter: (req, file, callback) => {
        const allowedMimeType = ['image/png', 'image/jpg', 'image/jpeg'];
        if (allowedMimeType.includes(file.mimetype)) {
          callback(null, true);
        } else {
          callback(new BadRequestException('Invalid file type'), false);
        }
      },
      limits: {
        fileSize: 1 * 1024 * 1024,
      },
    };
  }
}
