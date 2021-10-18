import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminController } from './admin.controller';
import { AdminRepository } from './admin.repository';
import { AdminService } from './admin.service';

@Module({
  imports: [TypeOrmModule.forFeature([AdminRepository])],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}
