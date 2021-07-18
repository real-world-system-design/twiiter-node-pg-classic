import { MigrationInterface, QueryRunner } from 'typeorm';

export class UserRefactoring1626597034241 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE 'users' RENAME COLUMN 'username' to 'name'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE 'users' RENAME COLUMN 'name' to 'username'`,
    );
  }
}
