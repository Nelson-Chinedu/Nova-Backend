import { MigrationInterface, QueryRunner } from "typeorm";

export class Profile1746713011803 implements MigrationInterface {
    name = 'Profile1746713011803'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Profile" ADD "date_of_birth" character varying(30) NOT NULL DEFAULT ''`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Profile" DROP COLUMN "date_of_birth"`);
    }

}
