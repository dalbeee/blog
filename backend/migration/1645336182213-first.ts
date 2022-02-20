import { MigrationInterface, QueryRunner } from 'typeorm';

export class first1645336182213 implements MigrationInterface {
  name = 'first1645336182213';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`config\` (\`id\` varchar(36) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`key\` varchar(255) NOT NULL, \`value\` varchar(255) NOT NULL, UNIQUE INDEX \`IDX_26489c99ddbb4c91631ef5cc79\` (\`key\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`logger\` (\`id\` varchar(36) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`message\` varchar(255) NOT NULL, \`type\` enum ('error', 'warn', 'info') NOT NULL, \`from\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`post\` (\`id\` varchar(36) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`title\` varchar(255) NOT NULL, \`content\` text NOT NULL, \`description\` varchar(255) NOT NULL, \`thumbnail\` varchar(500) NULL, \`slug\` varchar(255) NOT NULL, \`notionId\` varchar(255) NULL, \`userId\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`user\` (\`id\` varchar(36) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`email\` varchar(255) NOT NULL, \`username\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`roles\` text NULL, UNIQUE INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` (\`email\`), UNIQUE INDEX \`IDX_78a916df40e02a9deb1c4b75ed\` (\`username\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`notion\` (\`id\` varchar(36) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`title\` varchar(255) NOT NULL, \`content\` text NOT NULL, \`description\` varchar(255) NOT NULL, \`thumbnail\` varchar(500) NULL, \`slug\` varchar(255) NOT NULL, \`url\` varchar(255) NULL, \`userId\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`tag\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`upload\` (\`id\` varchar(36) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`fileName\` varchar(255) NOT NULL, \`path\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`tag_posts_post\` (\`tagId\` int NOT NULL, \`postId\` varchar(36) NOT NULL, INDEX \`IDX_6c2f3fa276343c3a11f5520cbe\` (\`tagId\`), INDEX \`IDX_c43864658728381c39e8df1803\` (\`postId\`), PRIMARY KEY (\`tagId\`, \`postId\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`post\` ADD CONSTRAINT \`FK_5c1cf55c308037b5aca1038a131\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`notion\` ADD CONSTRAINT \`FK_255ab0418c58cd6294013e01556\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`tag_posts_post\` ADD CONSTRAINT \`FK_6c2f3fa276343c3a11f5520cbe2\` FOREIGN KEY (\`tagId\`) REFERENCES \`tag\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE \`tag_posts_post\` ADD CONSTRAINT \`FK_c43864658728381c39e8df18032\` FOREIGN KEY (\`postId\`) REFERENCES \`post\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`tag_posts_post\` DROP FOREIGN KEY \`FK_c43864658728381c39e8df18032\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`tag_posts_post\` DROP FOREIGN KEY \`FK_6c2f3fa276343c3a11f5520cbe2\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`notion\` DROP FOREIGN KEY \`FK_255ab0418c58cd6294013e01556\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`post\` DROP FOREIGN KEY \`FK_5c1cf55c308037b5aca1038a131\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_c43864658728381c39e8df1803\` ON \`tag_posts_post\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_6c2f3fa276343c3a11f5520cbe\` ON \`tag_posts_post\``,
    );
    await queryRunner.query(`DROP TABLE \`tag_posts_post\``);
    await queryRunner.query(`DROP TABLE \`upload\``);
    await queryRunner.query(`DROP TABLE \`tag\``);
    await queryRunner.query(`DROP TABLE \`notion\``);
    await queryRunner.query(
      `DROP INDEX \`IDX_78a916df40e02a9deb1c4b75ed\` ON \`user\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` ON \`user\``,
    );
    await queryRunner.query(`DROP TABLE \`user\``);
    await queryRunner.query(`DROP TABLE \`post\``);
    await queryRunner.query(`DROP TABLE \`logger\``);
    await queryRunner.query(
      `DROP INDEX \`IDX_26489c99ddbb4c91631ef5cc79\` ON \`config\``,
    );
    await queryRunner.query(`DROP TABLE \`config\``);
  }
}
