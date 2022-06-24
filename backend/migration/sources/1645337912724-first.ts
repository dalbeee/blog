import { MigrationInterface, QueryRunner } from 'typeorm';

import * as bcrypt from 'bcrypt';

const email = process.env.NEST_ADMIN_USER_EMAIL;
const name = process.env.NEST_ADMIN_USER_NAME;
const password = bcrypt.hashSync(
  process.env.NEST_ADMIN_USER_PASSWORD as string,
  10,
);

export class first1645337912724 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO user (id, email, username, password, roles) VALUES (uuid(), '${email}', '${name}', '${password}', 'admin,user')`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
