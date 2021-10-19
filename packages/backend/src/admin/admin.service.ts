import { Injectable } from '@nestjs/common';

import { ConfigDTO } from '@blog/core/dist/domain';

import { AdminRepository } from './admin.repository';

@Injectable()
export class AdminService {
  constructor(private readonly adminRepository: AdminRepository) {}

  async setKeyValue(configDTO: ConfigDTO) {
    return (
      (await this.updateKeyValue(configDTO)) ||
      (await this.saveKeyValue(configDTO))
    );
  }

  async saveKeyValue(configDTO: ConfigDTO) {
    const row = this.adminRepository.create(configDTO);
    return await this.adminRepository.save(row);
  }

  async updateKeyValue(configDTO: ConfigDTO) {
    try {
      const findRow = await this.adminRepository.findOneOrFail({
        key: configDTO.key,
      });
      Object.assign(findRow, configDTO);
      return await this.adminRepository.save(findRow);
    } catch (error) {
      return;
    }
  }

  async getKeyValue(key: string) {
    return await this.adminRepository.findOne({ key });
  }

  async deleteKeyValue() {}
}
