import { MigrationInterface, QueryRunner } from "typeorm";

export class Account1746689913775 implements MigrationInterface {
    name = 'Account1746689913775'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "TimeOffRequests" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "leaveType" character varying(50) NOT NULL, "leaveFrom" character varying NOT NULL, "leaveTo" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "accountId" uuid, "profileId" uuid, CONSTRAINT "PK_5676a8bdca28d496c25d4379ac0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Profile" ("id" uuid NOT NULL, "firstname" character varying(255) NOT NULL DEFAULT '', "lastname" character varying(255) NOT NULL DEFAULT '', "phone_number" character varying NOT NULL DEFAULT '', "department" character varying NOT NULL DEFAULT '', "job_title" character varying(50) NOT NULL DEFAULT '', "contract_type" character varying(50) NOT NULL DEFAULT '', "image_url" character varying NOT NULL DEFAULT '', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "accountId" uuid, CONSTRAINT "REL_29e31c782fbe6b9a9c36b3dc43" UNIQUE ("accountId"), CONSTRAINT "PK_89dff233f744d59758158aca1d7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."Account_role_enum" AS ENUM('hr', 'admin', 'super_admin', 'user')`);
        await queryRunner.query(`CREATE TABLE "Account" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying(255) NOT NULL, "password" character varying(255) NOT NULL, "blocked" boolean NOT NULL DEFAULT false, "verified" boolean NOT NULL DEFAULT false, "role" "public"."Account_role_enum" NOT NULL DEFAULT 'user', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_bf68fd30f1adeede9c72a5cac09" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_cc1420f32afa2392dfdb500364" ON "Account" ("email") `);
        await queryRunner.query(`ALTER TABLE "TimeOffRequests" ADD CONSTRAINT "FK_e93f6138584d86568ad2524ad0e" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "TimeOffRequests" ADD CONSTRAINT "FK_c7da556c722e27485387cde9fd9" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Profile" ADD CONSTRAINT "FK_29e31c782fbe6b9a9c36b3dc43b" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Profile" DROP CONSTRAINT "FK_29e31c782fbe6b9a9c36b3dc43b"`);
        await queryRunner.query(`ALTER TABLE "TimeOffRequests" DROP CONSTRAINT "FK_c7da556c722e27485387cde9fd9"`);
        await queryRunner.query(`ALTER TABLE "TimeOffRequests" DROP CONSTRAINT "FK_e93f6138584d86568ad2524ad0e"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_cc1420f32afa2392dfdb500364"`);
        await queryRunner.query(`DROP TABLE "Account"`);
        await queryRunner.query(`DROP TYPE "public"."Account_role_enum"`);
        await queryRunner.query(`DROP TABLE "Profile"`);
        await queryRunner.query(`DROP TABLE "TimeOffRequests"`);
    }

}
