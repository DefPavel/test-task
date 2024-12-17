import { MigrationInterface, QueryRunner } from 'typeorm';

export class Tasks1734455922790 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "tasks" (
        "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
        "title" character varying(255) NOT NULL,
        "createdAt" TIMESTAMP(6) NOT NULL DEFAULT now(),
        "updatedAt" TIMESTAMP(6),
        "deletedAt" TIMESTAMP(6),
        CONSTRAINT "PK_tasks_id" PRIMARY KEY ("id")
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP TABLE "tasks";
    `);
  }
}
