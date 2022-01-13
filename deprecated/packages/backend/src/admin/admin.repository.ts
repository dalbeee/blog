import { EntityRepository, Repository } from 'typeorm';
import { Config } from './entity/config.entity';

@EntityRepository(Config)
export class AdminRepository extends Repository<Config> {}
