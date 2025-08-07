import { MigrationInterface, QueryRunner } from "typeorm";

export class CandidatePipelineStage1754225539644 implements MigrationInterface {
    name = 'CandidatePipelineStage1754225539644'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."Candidates_pipeline_stage_enum" AS ENUM('sourced', 'in_progress', 'interview', 'hired', 'rejected')`);
        await queryRunner.query(`ALTER TABLE "Candidates" ADD "pipeline_stage" "public"."Candidates_pipeline_stage_enum" NOT NULL DEFAULT 'sourced'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Candidates" DROP COLUMN "pipeline_stage"`);
        await queryRunner.query(`DROP TYPE "public"."Candidates_pipeline_stage_enum"`);
    }

}
