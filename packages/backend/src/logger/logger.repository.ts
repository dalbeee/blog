import { EntityRepository, Repository } from 'typeorm';
import { Logger } from './entity/logger.entity';

@EntityRepository(Logger)
export class LoggerRepository extends Repository<Logger> {}
