import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Upload } from './upload.entity';
import { Multer } from 'multer';

@Injectable()
export class UploadService {
  constructor(
    @Inject('UPLOAD_REPOSITORY')
    private readonly uploadRepository: Repository<Upload>,
  ) {}

  async getAllUploadedFiles() {
    try {
      return await this.uploadRepository.find();
    } catch (error) {
      console.log(error.message);
      return Error(error.message);
    }
  }

  async saveFileDataToDB(file: Multer.File): Promise<any> {
    console.log('upload service>', file);

    try {
      const row = this.uploadRepository.create();

      file.path.replace('\\', '/');

      row.fileName = file.filename;
      row.path = file.path;
      return await this.uploadRepository.save(row);
    } catch (error) {
      console.log(error.message);
      return Error(error.message);
    }
  }
}
