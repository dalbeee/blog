import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlertModule } from '@src/alert/alert.module';
import { LoggerController } from './logger.controller';
import { LoggerRepository } from './logger.repository';
import { LoggerService } from './logger.service';

@Module({
  imports: [TypeOrmModule.forFeature([LoggerRepository]), AlertModule],
  controllers: [LoggerController],
  providers: [LoggerService],
  exports: [LoggerService],
})
export class LoggerModule {}
