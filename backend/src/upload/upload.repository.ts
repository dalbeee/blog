import { EntityRepository, Repository } from 'typeorm';
import { Upload } from './upload.entity';

@EntityRepository(Upload)
export class UploadRepository extends Repository<Upload> {}
