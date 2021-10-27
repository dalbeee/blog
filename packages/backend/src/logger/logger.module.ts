import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggerController } from './logger.controller';
import { LoggerRepository } from './logger.repository';
import { LoggerService } from './logger.service';

@Module({
  imports: [TypeOrmModule.forFeature([LoggerRepository])],
  controllers: [LoggerController],
  providers: [LoggerService],
  exports: [LoggerService],
})
export class LoggerModule {}
