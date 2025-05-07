import { MigrationInterface, QueryRunner } from "typeorm";

export class TimeOffRequests1746546803573 implements MigrationInterface {
    name = 'TimeOffRequests1746546803573'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "TimeOffRequests" DROP CONSTRAINT "FK_c7da556c722e27485387cde9fd9"`);
        await queryRunner.query(`ALTER TABLE "TimeOffRequests" RENAME COLUMN "profileId" TO "accountId"`);
        await queryRunner.query(`ALTER TABLE "TimeOffRequests" ADD CONSTRAINT "FK_e93f6138584d86568ad2524ad0e" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "TimeOffRequests" DROP CONSTRAINT "FK_e93f6138584d86568ad2524ad0e"`);
        await queryRunner.query(`ALTER TABLE "TimeOffRequests" RENAME COLUMN "accountId" TO "profileId"`);
        await queryRunner.query(`ALTER TABLE "TimeOffRequests" ADD CONSTRAINT "FK_c7da556c722e27485387cde9fd9" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
