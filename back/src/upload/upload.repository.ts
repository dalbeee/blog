import { Connection } from 'typeorm';
import { Upload } from './upload.entity';

export const uploadRepository = {
  provide: 'UPLOAD_REPOSITORY',
  useFactory: (connection: Connection) => connection.getRepository(Upload),
  inject: ['DATABASE_CONNECTION'],
};
