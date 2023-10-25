import { UserEntity } from '@entities/users/users.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as fs from 'fs';
import { drive_v3, google } from 'googleapis';
import { join } from 'path';
import { Repository } from 'typeorm';

@Injectable()
export class UploadService {
  private readonly drive: drive_v3.Drive;
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {
    const auth = new google.auth.GoogleAuth({
      credentials: {
        private_key: process.env.GOOGLE_PRIVATE_KEY,
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
      },
      scopes: ['https://www.googleapis.com/auth/drive'],
    });
    this.drive = google.drive({
      version: 'v3',
      auth,
    });
  }

  // Upload avatar
  async uploadFile(email: string, file: Express.Multer.File): Promise<string> {
    const user = await this.userRepository.findOne({ where: { email } });
    const fileId = user.fileId;
    const targetFolderId = process.env.TARGET_FOLDER_ID;
    const fileStream = fs.createReadStream(file.path);
    let response: any;
    if (fileId) {
      response = await this.drive.files.update({
        fileId: fileId,
        media: {
          mimeType: file.mimetype,
          body: fileStream,
        },
        fields: 'id,thumbnailLink',
      });
    } else {
      response = await this.drive.files.create({
        requestBody: {
          name: file.filename,
          parents: [targetFolderId],
        },
        media: {
          mimeType: file.mimetype,
          body: fileStream,
        },
        fields: 'id,thumbnailLink',
      });
    }

    if (response) {
      await this.userRepository.update(user.id, {
        avatar: response.data.thumbnailLink,
        fileId: response.data.id,
      });
    }
    fs.unlink(join(__dirname, '../../../', 'temp'), (err) => {
      console.log(err);
    });

    return response.data.thumbnailLink;
  }
}
