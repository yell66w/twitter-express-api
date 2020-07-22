import { MigrationInterface, QueryRunner } from "typeorm";

export class UserRefactoring1595437566566 implements MigrationInterface {
  name = "UserRefactoring1595437566566";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" ADD "username" character varying NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD "password" character varying NOT NULL`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "password"`);
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "username"`);
  }
}
