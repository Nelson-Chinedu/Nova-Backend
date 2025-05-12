import { MigrationInterface, QueryRunner } from "typeorm";

export class Recruitments1747064961095 implements MigrationInterface {
    name = 'Recruitments1747064961095'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "Recruitments" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "job_title" character varying NOT NULL, "job_type" character varying(30) NOT NULL, "department" character varying(50) NOT NULL, "location" character varying(50) NOT NULL, "description" text NOT NULL, "about_company" text NOT NULL, "active_until" character varying(30) NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "accountId" uuid, CONSTRAINT "PK_8a74a67b74d19b81b28769626a0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "Recruitments" ADD CONSTRAINT "FK_8e762bfeebe3e4a4ebb415522c3" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Recruitments" DROP CONSTRAINT "FK_8e762bfeebe3e4a4ebb415522c3"`);
        await queryRunner.query(`DROP TABLE "Recruitments"`);
    }

}
