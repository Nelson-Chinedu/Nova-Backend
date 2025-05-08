import { MigrationInterface, QueryRunner } from "typeorm";

export class TimeOffRequests1746693302363 implements MigrationInterface {
    name = 'TimeOffRequests1746693302363'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "TimeOffRequests" ADD "leaveDays" integer`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "TimeOffRequests" DROP COLUMN "leaveDays"`);
    }

}
