import {
  Controller,
  Delete,
  Get,
  HttpException,
  Post,
  Req,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { UploadService } from './upload.service';
import { v4 as uuidv4 } from 'uuid';

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Get()
  getAllUploadedFiles() {
    return this.uploadService.getAllUploadedFiles();
  }

  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const randomName = uuidv4();
          const fileName = `${randomName}-${file.originalname}`;
          return cb(null, fileName);
        },
      }),
      limits: { fileSize: 1024 * 1024 * 5 },
      //
      fileFilter(
        req: Express.Request,
        file: Express.Multer.File,
        cb: (error: Error | null, acceptFile: boolean) => void,
      ) {
        console.log(file.mimetype);
        if (file.mimetype.match(/\/(jpg|jpeg|png|gif)$/)) return cb(null, true);
        return cb(null, false);
      },
    }),
  )
  uploadFile(@UploadedFile() file: Express.Multer.File, @Req() req) {
    console.log(req.headers);
    if (!file) {
      throw new HttpException('not supported file', 400);
    }
    return this.uploadService.saveFileDataToDB(file);
  }

  @Delete('upload')
  DeleteFile(@Req() req) {
    console.log('delete call', req.file);
    return;
  }
}
