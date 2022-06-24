import { Injectable } from '@nestjs/common';
import { Multer } from 'multer';

import { UploadRepository } from './upload.repository';

@Injectable()
export class UploadService {
  constructor(private readonly uploadRepository: UploadRepository) {}

  async getAllUploadedFiles() {
    try {
      return await this.uploadRepository.find();
    } catch (error) {
      throw error;
    }
  }

  async saveFileDataToDB(file: Multer.File): Promise<any> {
    try {
      const row = this.uploadRepository.create();

      file.path.replace('\\', '/');

      row.fileName = file.filename;
      row.path = file.path;
      return await this.uploadRepository.save(row);
    } catch (error) {
      throw error;
    }
  }
}
