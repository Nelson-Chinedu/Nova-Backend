import { MigrationInterface, QueryRunner } from "typeorm";

export class TimeOffRequests1746711689554 implements MigrationInterface {
    name = 'TimeOffRequests1746711689554'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."TimeOffRequests_status_enum" AS ENUM('pending', 'approved', 'rejected')`);
        await queryRunner.query(`ALTER TABLE "TimeOffRequests" ADD "status" "public"."TimeOffRequests_status_enum" NOT NULL DEFAULT 'pending'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "TimeOffRequests" DROP COLUMN "status"`);
        await queryRunner.query(`DROP TYPE "public"."TimeOffRequests_status_enum"`);
    }

}
