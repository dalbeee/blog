import { Module } from '@nestjs/common';
import { DatabaseModule } from '../db/db.module';
import { UploadController } from './upload.controller';
import { UploadService } from './upload.service';
import { uploadRepository } from './upload.repository';

@Module({
  imports: [DatabaseModule],
  controllers: [UploadController],
  providers: [UploadService, uploadRepository],
})
export class UploadModule {}
