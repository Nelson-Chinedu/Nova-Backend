import { MigrationInterface, QueryRunner } from "typeorm";

export class Candidate1754224350367 implements MigrationInterface {
    name = 'Candidate1754224350367'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "Candidates" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "firstname" character varying(255) NOT NULL DEFAULT '', "lastname" character varying(255) NOT NULL DEFAULT '', "email" character varying(100) NOT NULL DEFAULT '', "social" character varying(200) NOT NULL DEFAULT '', "url" character varying(255) NOT NULL DEFAULT '', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_425a3c7f933ceb7985bedfa2f43" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "Recruitments" ADD "candidateId" uuid`);
        await queryRunner.query(`ALTER TABLE "Recruitments" ADD CONSTRAINT "FK_d562bb0d1d139901b204ee98517" FOREIGN KEY ("candidateId") REFERENCES "Candidates"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Recruitments" DROP CONSTRAINT "FK_d562bb0d1d139901b204ee98517"`);
        await queryRunner.query(`ALTER TABLE "Recruitments" DROP COLUMN "candidateId"`);
        await queryRunner.query(`DROP TABLE "Candidates"`);
    }

}
