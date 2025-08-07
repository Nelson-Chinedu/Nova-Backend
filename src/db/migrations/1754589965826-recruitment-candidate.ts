import { MigrationInterface, QueryRunner } from "typeorm";

export class RecruitmentCandidate1754589965826 implements MigrationInterface {
    name = 'RecruitmentCandidate1754589965826'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Recruitments" DROP CONSTRAINT "FK_d562bb0d1d139901b204ee98517"`);
        await queryRunner.query(`ALTER TABLE "Recruitments" DROP COLUMN "candidateId"`);
        await queryRunner.query(`ALTER TABLE "Candidates" ADD "recruitmentId" uuid`);
        await queryRunner.query(`ALTER TABLE "Candidates" ADD CONSTRAINT "FK_0b64919f35c36ead15afda45d9f" FOREIGN KEY ("recruitmentId") REFERENCES "Recruitments"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Candidates" DROP CONSTRAINT "FK_0b64919f35c36ead15afda45d9f"`);
        await queryRunner.query(`ALTER TABLE "Candidates" DROP COLUMN "recruitmentId"`);
        await queryRunner.query(`ALTER TABLE "Recruitments" ADD "candidateId" uuid`);
        await queryRunner.query(`ALTER TABLE "Recruitments" ADD CONSTRAINT "FK_d562bb0d1d139901b204ee98517" FOREIGN KEY ("candidateId") REFERENCES "Candidates"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
